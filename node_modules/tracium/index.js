/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

const {MainThreadTasks} = require('./lib/main-thread-tasks.js');

function computeMainThreadTasks(trace, options = {}) {
  const {
    flatten = false,
  } = options;
  const allTasks = MainThreadTasks.compute(trace);
  const result = [];
  for (const task of allTasks) {
    task.kind = task.group.id;
    delete task.group;
    if (!task.parent || flatten)
      result.push(task);
  }
  return result;
}

module.exports = {computeMainThreadTasks};
