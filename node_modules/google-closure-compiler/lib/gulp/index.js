/*
 * Copyright 2015 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Gulp task for closure-compiler. Multiplexes input
 * files into a json encoded stream which can be piped into closure-compiler.
 * Each json file object includes the contents, path and optionally sourcemap
 * for every input file.
 *
 * Closure-compiler will return the same style string via standard-out which
 * is then converted back to vinyl files.
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */

'use strict';

/**
 * Rethrow an error with a custom message.
 * @see https://stackoverflow.com/a/42755876/1211524
 */
class CustomError extends Error {
  constructor(plugin, message) {
    if (message instanceof Error) {
      super(`Error in ${plugin}`);
      this.original = message;
      // Compose both the current stack and the original stack
      this.stack = `${this.stack.split('\n').slice(0,2).join('\n')}\n${message.stack}`;
    } else {
      super(`${plugin}: ${message}`);
    }
  }
}

/**
 * @param {Object<string,string>} initOptions
 * @return {function(Object<string,string>|Array<string>):Object}
 */
module.exports = function(initOptions) {
  const filesToJson = require('./concat-to-json');
  const jsonToVinyl = require('./json-to-vinyl');
  const stream = require('stream');
  const {getNativeImagePath, getFirstSupportedPlatform} = require('../utils');
  /** @const */
  const PLUGIN_NAME = 'gulp-google-closure-compiler';

  const applySourceMap = require('vinyl-sourcemaps-apply');
  const chalk = require('chalk');
  const File = require('vinyl');

  const extraCommandArguments = initOptions ? initOptions.extraArguments : undefined;

  let PluginError;
  try {
    PluginError = require('gulp-util').PluginError;
  } catch(e) {
    PluginError = CustomError;
  }

  let gulpLog;
  try {
    gulpLog = require('gulp-util').log;
  } catch(e) {
    gulpLog = console;
  }

  function getCompiler(platform) {
    return platform === 'javascript' ? require('../node/closure-compiler-js') : require('../node/closure-compiler');
  }

  class CompilationStream extends stream.Transform {
    constructor(compilationOptions, pluginOptions) {
      super({objectMode: true});
      pluginOptions = pluginOptions || {};

      this.compilationOptions_ = compilationOptions;
      this.streamMode_ = pluginOptions.streamMode || 'BOTH';
      this.logger_ = pluginOptions.logger || gulpLog;
      this.PLUGIN_NAME_ = pluginOptions.pluginName || PLUGIN_NAME;

      this.fileList_ = [];
      this._streamInputRequired = pluginOptions.requireStreamInput !== false;

      const jsMode = Boolean(initOptions && initOptions.jsMode);
      let platforms = (pluginOptions && pluginOptions.platform) || (jsMode ? ['javascript'] : ['native', 'java', 'javascript']);
      if (!Array.isArray(platforms)) {
        platforms = [platforms];
      }
      this.platform = getFirstSupportedPlatform(platforms);
    }

    src() {
      this._streamInputRequired = false;
      process.nextTick(() => {
        const stdInStream = new stream.Readable({ read: function() {
          return new File();
        }});
        stdInStream.pipe(this);
        stdInStream.push(null);
      });
      return this;
    }

    _transform(file, enc, cb) {
      // ignore empty files
      if (!file || file.isNull()) {
        cb();
        return;
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(this.PLUGIN_NAME_, 'Streaming not supported'));
        cb();
        return;
      }

      if (file.sourceMap && this.platform === 'javascript') {
        this.compilationOptions_.createSourceMap = true;
      }

      this.fileList_.push(file);
      cb();
    }

    _flush(cb) {
      let jsonFiles;
      if (this.fileList_.length > 0) {
        // Input files are present. Convert them to a JSON encoded string
        jsonFiles = filesToJson(this.fileList_);
      } else {
        // If files in the stream were required, no compilation needed here.
        if (this._streamInputRequired) {
          this.push(null);
          cb();
          return;
        }

        // The compiler will always expect something on standard-in. So pass it an empty
        // list if no files were piped into this plugin.
        jsonFiles = [];
      }
      const Compiler = getCompiler(this.platform);
      const compiler = new Compiler(this.compilationOptions_, extraCommandArguments);
      if (this.platform === 'javascript') {
        try {
          compiler.run(jsonFiles, (exitCode, outputFiles, errors) => {
            this._compilationComplete(exitCode, outputFiles, errors);
            cb();
          });
        } catch (e) {
          let errors = e.stack;
          // Special case for the exception thrown for an invalid flag
          if (/Bad value for | Unhandled flag: /.test(e.message)) {
            errors = e.message.replace(/^(java\.lang\.RuntimeException|Class[a-zA-Z0-9_\$]+): /, '');
          }

          this._compilationComplete(1, [], errors);
          cb();
          return;
        }
      } else {
        if (this.platform === 'native') {
          compiler.JAR_PATH = null;
          compiler.javaPath = getNativeImagePath();
        }
        let stdOutData = '';
        let stdErrData = '';

        // Add the gulp-specific argument so the compiler will understand the JSON encoded input
        // for gulp, the stream mode will be 'BOTH', but when invoked from grunt, we only use
        // a stream mode of 'IN'
        compiler.commandArguments.push('--json_streams', this.streamMode_);
        const compilerProcess = compiler.run();

        compilerProcess.stdout.on('data', data => {
          stdOutData += data;
        });
        compilerProcess.stderr.on('data', data => {
          stdErrData += data;
        });
        // Error events occur when there was a problem spawning the compiler process
        compilerProcess.on('error', err => {
          this.emit('error', new PluginError(this.PLUGIN_NAME_,
              'Process spawn error. Is java in the path?\n' + err.message));
          cb();
        });
        compilerProcess.stdin.on('error', err => {
          stdErrData += `Error writing to stdin of the compiler. ${err.message}`;
        });

        Promise.all([
          new Promise(resolve => compilerProcess.on('close', resolve)),
          new Promise(resolve => compilerProcess.stdout.on('end', resolve)),
          new Promise(resolve => compilerProcess.stderr.on('end', resolve))
        ]).then(results => {
          const code = results[0];

          // If present, standard output will be a string of JSON encoded files.
          // Convert these back to vinyl
          let outputFiles = [];
          if (stdOutData.trim().length > 0) {
            // stdOutData = stdOutData.substr(stdOutData.indexOf('{'));
            try {
              outputFiles = JSON.parse(stdOutData);
            } catch (e) {
              this.emit('error', new PluginError(this.PLUGIN_NAME_, 'Error parsing json encoded files'));
              cb();
              return;
            }
          }

          this._compilationComplete(code, outputFiles, stdErrData);
          cb();
        }).catch(err => {
          this.emit('error', new PluginError(this.PLUGIN_NAME_, err, { showStack: true }));
          cb();
        });

        const stdInStream = new stream.Readable({ read: function() {}});
        stdInStream.pipe(compilerProcess.stdin);
        process.nextTick(() => {
          stdInStream.push(JSON.stringify(jsonFiles));
          stdInStream.push(null);
        });
      }
    }

    /**
     * @param {number} exitCode
     * @param {string} compiledJs
     * @param {string} errors
     * @private
     */
    _compilationComplete(exitCode, compiledJs, errors) {
      // standard error will contain compilation warnings, log those
      if (errors && errors.trim().length > 0) {
        const logger = this.logger_.warn ? this.logger_.warn : this.logger_;
        logger(`${chalk.yellow(this.PLUGIN_NAME_)}: ${errors}`);
      }

      // non-zero exit means a compilation error
      if (exitCode !== 0) {
        this.emit('error', new PluginError(this.PLUGIN_NAME_, `Compilation errors occurred`));
      }

      // If present, standard output will be a string of JSON encoded files.
      // Convert these back to vinyl
      let outputFiles = jsonToVinyl(compiledJs);

      for (let i = 0; i < outputFiles.length; i++) {
        if (outputFiles[i].sourceMap) {
          applySourceMap(outputFiles[i], outputFiles[i].sourceMap);
        }
        this.push(outputFiles[i]);
      }
    }
  }

  return (compilationOptions, pluginOptions) => new CompilationStream(compilationOptions, pluginOptions);
};
