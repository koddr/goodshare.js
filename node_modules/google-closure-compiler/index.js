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
 * @fileoverview Nodejs plugins and build tools for Google Closure Compiler
 *
 * @author Chad Killingsworth (chadkillingsworth@gmail.com)
 */

'use strict';

// defer loading modules. The jscomp file is rather large. Don't load it unless it's actually referenced.
class Main {
  static get grunt() {
    return require('./lib/grunt');
  }

  static get gulp() {
    return require('./lib/gulp');
  }

  static get compiler() {
    return require('./lib/node/closure-compiler');
  }

  static get jsCompiler() {
    return require('./lib/node/closure-compiler-js');
  }
  
  static get gjd() {
    return require('google-closure-compiler-js').gjd;
  }
}

module.exports = Main;
