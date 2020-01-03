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

/**
 * @fileoverview Low level class for calling the closure-compiler-js lib
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */

'use strict';

const path = require('path');
const contribPath = path.resolve(__dirname, '../../contrib');
const jscomp = require('google-closure-compiler-js');
const CONSOLE_COLOR_CHARS = /\u001B\[\d+m/ug;

class CompilerJS {
  /** @param {Object<string,string>|Array<string>} flags */
  constructor(flags) {
    this.flags = {};
    if (Array.isArray(flags)) {
      flags.forEach(flag => {
        const flagPargs = flag.split('=');
        const normalizedFlag = this.formatArgument(flagPargs[0], flagPargs[1]);
        this.flags[normalizedFlag.key] = normalizedFlag.val;
      });
    } else {
      for (let key in flags) {
        const normalizedFlag = this.formatArgument(key, flags[key]);
        this.flags[normalizedFlag.key] = normalizedFlag.val;
      }
    }
  }

  /**
   * @param {!Array<!{src: string, path: string, sourceMap: string}>} fileList
   * @param {function(number, Array<{src: string, path: string, sourceMap: (string|undefined)}>, string)=} callback
   * @return {child_process.ChildProcess}
   */
  run(fileList, callback) {
    const out = jscomp(this.flags, fileList);
    // GWT error and warnings are not true JS arrays, but are array-like.
    // Convert them to standard JS arrays.
    out.warnings = [].slice.call(out.warnings);
    out.errors = [].slice.call(out.errors);
    if (callback) {
      const errors = [];
      const logErrors = require('../logger');
      logErrors(out, fileList, logOutput => {
        // The logger uses terminal color markers which we don't want by default.
        errors.push(logOutput.replace(CONSOLE_COLOR_CHARS, ''));
      });
      callback(errors.length === 0 ? 0 : 1, out.compiledFiles, errors.join('\n\n'));
    }
    return out;
  }

  /**
   * @param {string} key
   * @param {(string|boolean)=} val
   * @return {{key: string, val: (string|undefined)}}
   */
  formatArgument(key, val) {
    let normalizedKey = key.replace(/_(\w)/g, match => match[1].toUpperCase());
    normalizedKey = normalizedKey.replace(/^--/, '');

    return {
      key: normalizedKey,
      val: val === undefined || val === null ? true : val
    };
  }
}

/** @type {string} */
CompilerJS.CONTRIB_PATH = contribPath;

module.exports = CompilerJS;
