const test = require('ava')
const path = require('path')
const estimo = require('../src/lib')
const { writeFile } = require('../src/utils')
const { findChrome } = require('../scripts/chromeDetection')

test('estimo - should works properly with js files', async (t) => {
  const chromeLocation = await findChrome()

  const lib1 = path.join(__dirname, '__mock__', '19kb.js')
  const lib2 = 'https://unpkg.com/react@16/umd/react.development.js'
  const lib3 = path.join(__dirname, '__mock__', '13kb.js')

  const reports = await estimo([lib1, lib2, lib3], { executablePath: chromeLocation })

  t.is(reports[0].name, '19kb.js')
  t.is(typeof reports[0].parseHTML === 'number' && reports[0].parseHTML >= 0, true)
  t.is(typeof reports[0].styleLayout === 'number' && reports[0].styleLayout >= 0, true)
  t.is(typeof reports[0].paintCompositeRender === 'number' && reports[0].paintCompositeRender >= 0, true)
  t.is(typeof reports[0].scriptParseCompile === 'number' && reports[0].scriptParseCompile >= 0, true)
  t.is(typeof reports[0].scriptEvaluation === 'number' && reports[0].scriptEvaluation >= 0, true)
  t.is(typeof reports[0].javaScript === 'number' && reports[0].javaScript > 0, true)
  t.is(typeof reports[0].garbageCollection === 'number' && reports[0].garbageCollection >= 0, true)
  t.is(typeof reports[0].other === 'number' && reports[0].other >= 0, true)
  t.is(typeof reports[0].total === 'number' && reports[0].total > 0, true)

  t.is(reports[1].name, 'react.development.js')
  t.is(typeof reports[1].parseHTML === 'number' && reports[1].parseHTML >= 0, true)
  t.is(typeof reports[1].styleLayout === 'number' && reports[1].styleLayout >= 0, true)
  t.is(typeof reports[1].paintCompositeRender === 'number' && reports[1].paintCompositeRender >= 0, true)
  t.is(typeof reports[1].scriptParseCompile === 'number' && reports[1].scriptParseCompile >= 0, true)
  t.is(typeof reports[1].scriptEvaluation === 'number' && reports[1].scriptEvaluation >= 0, true)
  t.is(typeof reports[1].javaScript === 'number' && reports[1].javaScript > 0, true)
  t.is(typeof reports[1].garbageCollection === 'number' && reports[1].garbageCollection >= 0, true)
  t.is(typeof reports[1].other === 'number' && reports[1].other >= 0, true)
  t.is(typeof reports[1].total === 'number' && reports[1].total > 0, true)

  t.is(reports[2].name, '13kb.js')
  t.is(typeof reports[2].parseHTML === 'number' && reports[2].parseHTML >= 0, true)
  t.is(typeof reports[2].styleLayout === 'number' && reports[2].styleLayout >= 0, true)
  t.is(typeof reports[2].paintCompositeRender === 'number' && reports[2].paintCompositeRender >= 0, true)
  t.is(typeof reports[2].scriptParseCompile === 'number' && reports[2].scriptParseCompile >= 0, true)
  t.is(typeof reports[2].scriptEvaluation === 'number' && reports[2].scriptEvaluation >= 0, true)
  t.is(typeof reports[2].javaScript === 'number' && reports[2].javaScript > 0, true)
  t.is(typeof reports[2].garbageCollection === 'number' && reports[2].garbageCollection >= 0, true)
  t.is(typeof reports[2].other === 'number' && reports[2].other >= 0, true)
  t.is(typeof reports[2].total === 'number' && reports[2].total > 0, true)

  await writeFile(path.join(__dirname, '../..', 'chrome.json'), '{ "executablePath": "" }')
})

test('estimo - should works properly with web pages', async (t) => {
  const chromeLocation = await findChrome()

  const page1 = 'https://www.google.com/'
  const page2 = 'https://translate.google.com/'

  const reports = await estimo([page1, page2], { executablePath: chromeLocation })

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

test('estimo - should works properly with mixed resources', async (t) => {
  const chromeLocation = await findChrome()

  const page1 = 'https://www.google.com/'
  const page2 = 'https://translate.google.com/'
  const lib1 = path.join(__dirname, '__mock__', '19kb.js')
  const lib2 = 'https://unpkg.com/react@16/umd/react.development.js'

  const reports = await estimo([page1, page2, lib1, lib2], { executablePath: chromeLocation })

  t.is(reports[0].name, '19kb.js')
  t.is(typeof reports[0].parseHTML === 'number' && reports[0].parseHTML >= 0, true)
  t.is(typeof reports[0].styleLayout === 'number' && reports[0].styleLayout >= 0, true)
  t.is(typeof reports[0].paintCompositeRender === 'number' && reports[0].paintCompositeRender >= 0, true)
  t.is(typeof reports[0].scriptParseCompile === 'number' && reports[0].scriptParseCompile >= 0, true)
  t.is(typeof reports[0].scriptEvaluation === 'number' && reports[0].scriptEvaluation >= 0, true)
  t.is(typeof reports[0].javaScript === 'number' && reports[0].javaScript > 0, true)
  t.is(typeof reports[0].garbageCollection === 'number' && reports[0].garbageCollection >= 0, true)
  t.is(typeof reports[0].other === 'number' && reports[0].other >= 0, true)
  t.is(typeof reports[0].total === 'number' && reports[0].total > 0, true)

  t.is(reports[1].name, 'react.development.js')
  t.is(typeof reports[1].parseHTML === 'number' && reports[1].parseHTML >= 0, true)
  t.is(typeof reports[1].styleLayout === 'number' && reports[1].styleLayout >= 0, true)
  t.is(typeof reports[1].paintCompositeRender === 'number' && reports[1].paintCompositeRender >= 0, true)
  t.is(typeof reports[1].scriptParseCompile === 'number' && reports[1].scriptParseCompile >= 0, true)
  t.is(typeof reports[1].scriptEvaluation === 'number' && reports[1].scriptEvaluation >= 0, true)
  t.is(typeof reports[1].javaScript === 'number' && reports[1].javaScript > 0, true)
  t.is(typeof reports[1].garbageCollection === 'number' && reports[1].garbageCollection >= 0, true)
  t.is(typeof reports[1].other === 'number' && reports[1].other >= 0, true)
  t.is(typeof reports[1].total === 'number' && reports[1].total > 0, true)

  t.is(reports[2].name, 'https://www.google.com/')
  t.is(typeof reports[2].parseHTML === 'number' && reports[2].parseHTML >= 0, true)
  t.is(typeof reports[2].styleLayout === 'number' && reports[2].styleLayout >= 0, true)
  t.is(typeof reports[2].paintCompositeRender === 'number' && reports[2].paintCompositeRender >= 0, true)
  t.is(typeof reports[2].scriptParseCompile === 'number' && reports[2].scriptParseCompile >= 0, true)
  t.is(typeof reports[2].scriptEvaluation === 'number' && reports[2].scriptEvaluation >= 0, true)
  t.is(typeof reports[2].javaScript === 'number' && reports[2].javaScript > 0, true)
  t.is(typeof reports[2].garbageCollection === 'number' && reports[2].garbageCollection >= 0, true)
  t.is(typeof reports[2].other === 'number' && reports[2].other >= 0, true)
  t.is(typeof reports[2].total === 'number' && reports[2].total > 0, true)

  t.is(reports[3].name, 'https://translate.google.com/')
  t.is(typeof reports[3].parseHTML === 'number' && reports[3].parseHTML >= 0, true)
  t.is(typeof reports[3].styleLayout === 'number' && reports[3].styleLayout >= 0, true)
  t.is(typeof reports[3].paintCompositeRender === 'number' && reports[3].paintCompositeRender >= 0, true)
  t.is(typeof reports[3].scriptParseCompile === 'number' && reports[3].scriptParseCompile >= 0, true)
  t.is(typeof reports[3].scriptEvaluation === 'number' && reports[3].scriptEvaluation >= 0, true)
  t.is(typeof reports[3].javaScript === 'number' && reports[3].javaScript > 0, true)
  t.is(typeof reports[3].garbageCollection === 'number' && reports[3].garbageCollection >= 0, true)
  t.is(typeof reports[3].other === 'number' && reports[3].other >= 0, true)
  t.is(typeof reports[3].total === 'number' && reports[3].total > 0, true)

  await writeFile(path.join(__dirname, '../..', 'chrome.json'), '{ "executablePath": "" }')
})
