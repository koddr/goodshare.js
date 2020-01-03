const test = require('ava')
const path = require('path')
const { estimoPageMode } = require('../../src/page-mode')
const { findChrome } = require('../../scripts/chromeDetection')
const { writeFile } = require('../../src/utils')

test('estimoPageMode - should works properly', async (t) => {
  const chromeLocation = await findChrome()

  const page1 = 'https://www.google.com/'
  const page2 = 'https://translate.google.com/'

  const reports = await estimoPageMode([page1, page2], { executablePath: chromeLocation })

  t.is(reports[0].name, 'https://www.google.com/')
  t.is(typeof reports[0].parseHTML === 'number' && reports[0].parseHTML >= 0, true)
  t.is(typeof reports[0].styleLayout === 'number' && reports[0].styleLayout >= 0, true)
  t.is(typeof reports[0].paintCompositeRender === 'number' && reports[0].paintCompositeRender >= 0, true)
  t.is(typeof reports[0].scriptParseCompile === 'number' && reports[0].scriptParseCompile >= 0, true)
  t.is(typeof reports[0].scriptEvaluation === 'number' && reports[0].scriptEvaluation >= 0, true)
  t.is(typeof reports[0].javaScript === 'number' && reports[0].javaScript > 0, true)
  t.is(typeof reports[0].garbageCollection === 'number' && reports[0].garbageCollection >= 0, true)
  t.is(typeof reports[0].other === 'number' && reports[0].other >= 0, true)
  t.is(typeof reports[0].total === 'number' && reports[0].total > 0, true)

  t.is(reports[1].name, 'https://translate.google.com/')
  t.is(typeof reports[1].parseHTML === 'number' && reports[1].parseHTML >= 0, true)
  t.is(typeof reports[1].styleLayout === 'number' && reports[1].styleLayout >= 0, true)
  t.is(typeof reports[1].paintCompositeRender === 'number' && reports[1].paintCompositeRender >= 0, true)
  t.is(typeof reports[1].scriptParseCompile === 'number' && reports[1].scriptParseCompile >= 0, true)
  t.is(typeof reports[1].scriptEvaluation === 'number' && reports[1].scriptEvaluation >= 0, true)
  t.is(typeof reports[1].javaScript === 'number' && reports[1].javaScript > 0, true)
  t.is(typeof reports[1].garbageCollection === 'number' && reports[1].garbageCollection >= 0, true)
  t.is(typeof reports[1].other === 'number' && reports[1].other >= 0, true)
  t.is(typeof reports[1].total === 'number' && reports[1].total > 0, true)

  await writeFile(path.join(__dirname, '../..', 'chrome.json'), '{ "executablePath": "" }')
})
