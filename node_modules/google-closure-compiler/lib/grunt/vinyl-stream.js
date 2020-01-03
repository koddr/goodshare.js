/*
 * Copyright 2016 The Closure Compiler Authors.
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
 * @fileoverview Class to convert an array of file paths to
 * as stream of Vinyl files.
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Readable = require('stream').Readable;
const File = require('vinyl');

class VinylStream extends Readable {
  constructor(files, opts) {
    super({objectMode: true});
    this._base = path.resolve(opts.base || process.cwd());
    this._files = files.slice();
    this.resume();
  }

  _read() {
    if (this._files.length === 0) {
      this.emit('end');
      return;
    }
    this.readFile();
  }

  readFile() {
    if (this._files.length === 0) {
      return;
    }
    const filepath = this._files.shift();
    const fullpath = path.resolve(this._base, filepath);
    fs.readFile(fullpath, (err, data) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      const file = new File({
        base: this._base,
        path: fullpath,
        contents: data
      });

      if (!this.push(file)) {
        return;
      } else {
        this.readFile();
      }
    });
  }
}

module.exports = VinylStream;
