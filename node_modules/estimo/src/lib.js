const { estimoJsMode } = require('./js-mode')
const { estimoPageMode } = require('./page-mode')
const { splitResourcesForEstimo, debugLog } = require('./utils')

function checkInputArgs(resources, browserOptions) {
  if (typeof resources !== 'string' && !Array.isArray(resources)) {
    throw new Error(
      'The first argument should be String or Array<String> which contains a path to the resource (js file or web page).',
    )
  }
  if (Array.isArray(resources)) {
    resources.forEach(item => {
      if (typeof item !== 'string') {
        throw new Error(
          'All resources should be represented as a <String> path to the resource (js file or web page).',
        )
      }
    })
  }
  if (typeof browserOptions !== 'object' || browserOptions.constructor !== Object) {
    throw new Error(
      'The second argument should be an Object which contains browser options (see https://github.com/mbalabash/estimo/blob/master/README.md).',
    )
  }
}

async function estimo(resources = [], browserOptions = {}) {
  checkInputArgs(resources, browserOptions)

  try {
    const { pages, libraries } = splitResourcesForEstimo(resources)
    let reports = []

    debugLog(`\n[estimo]: Found next js files: ${libraries}\n`)
    debugLog(`\n[estimo]: Found next web pages: ${pages}\n`)

    if (libraries.length > 0) {
      reports = reports.concat(await estimoJsMode(libraries, browserOptions))
    }

    if (pages.length > 0) {
      reports = reports.concat(await estimoPageMode(pages, browserOptions))
    }

    debugLog(`\n[estimo]: Result reports: ${JSON.stringify(reports)}\n`)

    return reports
  } catch (error) {
    console.error(error.stack)
    return process.exit(1)
  }
}

module.exports = estimo
module.exports.estimoJsMode = estimoJsMode
module.exports.estimoPageMode = estimoPageMode
