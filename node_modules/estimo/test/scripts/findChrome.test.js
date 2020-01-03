const test = require('ava')
const path = require('path')
const { readFile, writeFile } = require('../../src/utils')
const { findChrome } = require('../../scripts/chromeDetection')

test('should set location setting for downloaded or local chrome', async t => {
  const pathToChrome = await findChrome()
  const configData = JSON.parse(await readFile(path.join(__dirname, '../..', 'chrome.json')))

  t.is(typeof pathToChrome === 'string' && pathToChrome.length > 0, true)
  t.is(configData.executablePath.length > 0, true)
  t.is(configData.executablePath === pathToChrome, true)

  await writeFile(path.join(__dirname, '../..', 'chrome.json'), '{ "executablePath": "" }')
})
