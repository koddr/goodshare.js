#!/usr/bin/env node
/*
 * Copyright 2018 The Closure Compiler Authors.
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
'use strict';
const fs = require('fs');
const path = require('path');
const {getNativeImagePath, getFirstSupportedPlatform} = require('./lib/utils');
const parseArgs = require('minimist');

/** @see https://stackoverflow.com/a/40686853/1211524 */
function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}

const compilerFlags = parseArgs(process.argv.slice(2));

// The platform flag is only used by this cli script - it is not natively supported by any compiler version.
// If it exists, use the value, but then delete it so that it's not actually passed to the compiler.
let platform;
if (compilerFlags.hasOwnProperty('platform')) {
  platform = compilerFlags.platform;
  delete compilerFlags.platform;
} else {
  platform = getFirstSupportedPlatform(['native', 'java', 'javascript']);
}

// The compiler treats default arguments as if they were --js args.
// Minimist parses default arguments and puts them under the '_' key.
// Move the '_' key to the 'js' key.
if (compilerFlags.hasOwnProperty('_') && compilerFlags['_'].length > 0) {
  let existingJsFlags = [];
  if (compilerFlags.js) {
    if (Array.isArray(compilerFlags.js)) {
      existingJsFlags = compilerFlags.js;
    } else {
      existingJsFlags = [compilerFlags.js];
    }
  }
  compilerFlags.js = existingJsFlags.concat(compilerFlags['_']);
  delete compilerFlags['_'];
} else {
  delete compilerFlags['_'];
}

// Boolean arguments can in some cases be parsed as strings.
// Since its highly unlikely that an argument actually needs to be the strings 'true' or 'false',
// convert them to true booleans.
Object.keys(compilerFlags).forEach(flag => {
  if (compilerFlags[flag] === 'true') {
    compilerFlags[flag] = true;
  } else if (compilerFlags[flag] === 'false') {
    compilerFlags[flag] = false;
  }
});

if (platform !== 'javascript') {
  const Compiler = require('./lib/node/closure-compiler');
  let args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (/^--platform/.test(args[i])) {
      let delCount = 1;
      if (args[i].indexOf('=') < 0 && args.length > i + 1) {
        delCount++;
      }
      args.splice(i, delCount);
      break;
    }
  }

  const compiler = new Compiler(args);

  compiler.spawnOptions = {stdio: 'inherit'};
  if (platform === 'native') {
    compiler.JAR_PATH = null;
    compiler.javaPath = getNativeImagePath();
  }

  compiler.run((exitCode) => {
    process.exitCode = exitCode;
  });
} else {
  if (compilerFlags.help === true) {
    process.stdout.write('Sample usage: --compilation_level (-O) VAL --externs VAL --js VAL --js_output_file VAL --warning_level (-W) [QUIET | DEFAULT | VERBOSE]\n');
    process.stdout.write('See https://github.com/google/closure-compiler/wiki/Flags-and-Options for the full list of flags`);\n');
    process.exit(0);
  }

  if (compilerFlags.version === true) {
    const {version} = require('./package.json');
    process.stdout.write(`Version: ${version}\n`);
    process.exit(0);
  }

  let waitOnStdIn = true;
  if (compilerFlags.js) {
    waitOnStdIn = false;
  }

  // Mimic the behavior of the java version and wait for input from standard if there
  // are no --js flags
  const getFilesFromStdin = !waitOnStdIn ? Promise.resolve([]) : new Promise(resolve => {
    let stdInData = '';
    const waitingTimeout = setTimeout(() => {
      process.stderr.write('The compiler is waiting for input via stdin.\n');
    }, 1000);
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        stdInData += chunk;
        clearTimeout(waitingTimeout);
      }
    });
    process.stdin.on('error', (err) => {
      process.exitCode = 1;
      console.error(err);
      clearTimeout(waitingTimeout);
    });
    process.stdin.on('end', () => {
      if (stdInData.length > 0) {
        resolve([{
          path: 'stdin',
          src: stdInData
        }]);
      } else {
        resolve([]);
      }
      clearTimeout(waitingTimeout);
    });
  });

  getFilesFromStdin.then(inputFiles => {
      const Compiler = require('./lib/node/closure-compiler-js');
      const logErrors = require('./lib/logger');
      const compiler = new Compiler(compilerFlags);
      const output = compiler.run(inputFiles);
      if (output.errors.length > 0) {
        process.exitCode = process.exitCode || 1;
      }
      logErrors(output, inputFiles);
      if (output.compiledFiles.length > 0) {
        // If a --js_output_file or --chunk flag was provided, the output should be written to disk
        if (compilerFlags['js_output_file'] || compilerFlags['chunk']) {
          let srcMapPattern = '%outname%.map';
          // Unfortunately the JS version of the compiler supported the `--create_source_map` flag as a boolean.
          // We now support it both as a boolean and as a string path pattern.
          if (compilerFlags.create_source_map && typeof compilerFlags.create_source_map === 'string') {
            srcMapPattern = compilerFlags.create_source_map;
          }
          output.compiledFiles.forEach(compiledFile => {
            mkDirByPathSync(path.dirname(compiledFile.path));
            fs.writeFileSync(compiledFile.path, compiledFile.src, 'utf8');
            if (compiledFile.sourceMap) {
              const srcMapPath = srcMapPattern.replace('%outname%', compiledFile.path);
              mkDirByPathSync(path.dirname(srcMapPath));
              fs.writeFileSync(srcMapPath, compiledFile.sourceMap, 'utf8');
            }
          });
        } else {
          process.stdout.write(`${output.compiledFiles[0].src}\n`);
        }
      }
    })
    .catch(e => {
      console.error(e);
      process.exitCode = process.exitCode || 1;
    });
}
