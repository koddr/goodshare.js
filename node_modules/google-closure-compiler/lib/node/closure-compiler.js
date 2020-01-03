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
 * @fileoverview Low level class for calling the closure-compiler jar
 * from nodejs
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */

'use strict';

const spawn = require('child_process').spawn;
const compilerPath = require('google-closure-compiler-java');
const path = require('path');
const contribPath = path.resolve(__dirname, '../../contrib');

class Compiler {
  /**
   * @param {Object<string,string>|Array<string>} args
   * @param {Array<String>=} extraCommandArgs
   */
  constructor(args, extraCommandArgs) {
    this.commandArguments = [];
    this.extraCommandArgs = extraCommandArgs;

    if (Compiler.JAR_PATH) {
      this.JAR_PATH = Compiler.JAR_PATH;
    }

    if (Array.isArray(args)) {
      this.commandArguments = this.commandArguments.concat(args.slice());
    } else {
      for (let key in args) {
        if (Array.isArray(args[key])) {
          for (let i = 0; i < args[key].length; i++) {
            this.commandArguments.push(
                this.formatArgument(key, args[key][i]));
          }
        } else {
          this.commandArguments.push(
              this.formatArgument(key, args[key]));
        }
      }
    }
  }

  /**
   * @param {function(number, string, string)=} callback
   * @return {child_process.ChildProcess}
   */
  run(callback) {
    if (this.JAR_PATH) {
      this.commandArguments.unshift('-jar', Compiler.JAR_PATH);
      if (this.extraCommandArgs) {
        this.commandArguments.unshift(...this.extraCommandArgs);
      }
    }

    if (this.logger) {
      this.logger(this.getFullCommand() + '\n');
    }
    let compileProcess = spawn(this.javaPath, this.commandArguments, this.spawnOptions);

    let stdOutData = '';
    let stdErrData = '';
    if (callback) {
      if (compileProcess.stdout) {
        compileProcess.stdout.setEncoding('utf8');
        compileProcess.stdout.on('data', data => {
          stdOutData += data;
        });
        compileProcess.stdout.on('error', err => {
          stdErrData += err.toString();
        });
      }

      if (compileProcess.stderr) {
        compileProcess.stderr.setEncoding('utf8');
        compileProcess.stderr.on('data', data => {
          stdErrData += data;
        });
      }

      compileProcess.on('close',  code => {
        if (code !== 0) {
          stdErrData = this.prependFullCommand(stdErrData);
        }

        callback(code, stdOutData, stdErrData);
      });

      compileProcess.on('error', err => {
        callback(1, stdOutData,
            this.prependFullCommand('Process spawn error. Is java in the path?\n' + err.message));
      });
    }

    return compileProcess;
  }


  /**
   * @return {string}
   */
  getFullCommand() {
    return this.javaPath + ' ' + this.commandArguments.join(' ');
  }

  /**
   * @param {string} msg
   * @return {string}
   */
  prependFullCommand(msg) {
    return this.getFullCommand() + '\n\n' + msg + '\n\n';
  }

  /**
   * @param {string} key
   * @param {(string|boolean)=} val
   * @return {string}
   */
  formatArgument(key, val) {
    let normalizedKey = key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
    normalizedKey = normalizedKey.replace(/^--/, '');

    if (val === undefined || val === null) {
      return `--${normalizedKey}`;
    }

    return `--${normalizedKey}=${val}`;
  }
}

/**
 * @const
 * @type {string}
 */
Compiler.JAR_PATH = compilerPath;

/**
 * @type {string}
 */
Compiler.prototype.javaPath = 'java';

/** @type {function(...*)|null} */
Compiler.prototype.logger = null;

/** @type {Object<string, string>} */
Compiler.prototype.spawnOptions = undefined;

/** @type {string} */
Compiler.COMPILER_PATH = compilerPath;

/** @type {string} */
Compiler.CONTRIB_PATH = contribPath;

module.exports = Compiler;
