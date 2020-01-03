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
 * @fileoverview Convert a string of JSON encoded files
 * back to an array of vinyl files
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */

'use strict';

const File = require('vinyl');

/**
 * @param {string} input string of json encoded files
 * @return {Array<Object>}
 */
module.exports = fileList => {
  let outputFiles = [];
  for (let i = 0; i < fileList.length; i++) {
    const file = new File({
      path: fileList[i].path,
      contents: Buffer.from(fileList[i].src)
    });
    if (fileList[i].source_map || fileList[i].sourceMap) {
      file.sourceMap = JSON.parse(fileList[i].source_map || fileList[i].sourceMap);
    }
    outputFiles.push(file);
  }

  return outputFiles;
};

