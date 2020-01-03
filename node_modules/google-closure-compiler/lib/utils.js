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

function getNativeImagePath() {
  if (process.platform === 'darwin') {
    try {
      return require('google-closure-compiler-osx');
    } catch (e) {
      return;
    }
  }
  if (process.platform === 'win32') {
    try {
      return require('google-closure-compiler-windows');
    } catch (e) {
      return;
    }
  }
  try {
    return require('google-closure-compiler-linux');
  } catch (e) {
  }
}

function getFirstSupportedPlatform(platforms) {
  const platform = platforms.find((platform, index) => {
    switch (platform.toLowerCase()) {
      case "java":
        if (index === platforms.length - 1) {
          return true;
        }
        return process.env.JAVA_HOME;

      case "javascript":
        return true;

      case "native":
        if (getNativeImagePath()) {
          return true;
        }
    }
  });
  if (!platform) {
    throw new Error('No supported platform for closure-compiler found.');
  }
  return platform;
}

module.exports = {
  getNativeImagePath,
  getFirstSupportedPlatform
};
