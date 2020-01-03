const test = require('ava')
const path = require('path')
const { prepareLibrariesForEstimation } = require('../../src/js-mode/prepare-libs-for-estimo')

test('should properly prepare resources for Estimo', async (t) => {
  const lib1 = path.join(__dirname, '..', '__mock__', '19kb.js')
  const lib2 = path.join(__dirname, '..', '__mock__', '13kb.js')
  const lib3 = 'https://unpkg.com/react@16/umd/react.development.js'

  t.deepEqual(await prepareLibrariesForEstimation([]), [])

  const resources = await prepareLibrariesForEstimation([lib1, lib2, lib3])
  t.is(resources[0].name, '19kb.js')
  t.is(resources[0].url.includes('file://'), true)
  t.is(resources[0].url.includes('temp'), true)
  t.is(resources[0].url.includes('.html'), true)
  t.is(resources[0].html.includes('temp'), true)
  t.is(resources[0].html.includes('.html'), true)

  t.is(resources[1].name, '13kb.js')
  t.is(resources[1].url.includes('file://'), true)
  t.is(resources[1].url.includes('temp'), true)
  t.is(resources[1].url.includes('.html'), true)
  t.is(resources[1].html.includes('temp'), true)
  t.is(resources[1].html.includes('.html'), true)

  t.is(resources[2].name, 'react.development.js')
  t.is(resources[2].url.includes('file://'), true)
  t.is(resources[2].url.includes('temp'), true)
  t.is(resources[2].url.includes('.html'), true)
  t.is(resources[2].html.includes('temp'), true)
  t.is(resources[2].html.includes('.html'), true)
})

test('should throw an error for not existed local js files', async (t) => {
  const error = await t.throwsAsync(prepareLibrariesForEstimation(['some/not/existed/file.js']))
  t.is(error.message, `some/not/existed/file.js - file not exist!`)
})
