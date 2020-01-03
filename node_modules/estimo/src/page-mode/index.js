const { createChromeTrace } = require('../create-chrome-trace')
const { generatePrettyReport } = require('../reporter')
const { removeAllFiles, debugLog } = require('../utils')

async function estimoPageMode(pages, browserOptions) {
  try {
    let resources = pages.map(page => ({ name: page, url: page }))
    resources = await createChromeTrace(resources, browserOptions)
    debugLog(
      `\n[page-mode]: Next url's resources has been prepared: ${JSON.stringify(resources)}\n`,
    )

    const reports = await generatePrettyReport(resources)
    debugLog(`\n[page-mode]: Got reports for web pages: ${JSON.stringify(reports)}\n`)

    await removeAllFiles(resources.map(file => file.trace))

    return reports
  } catch (error) {
    console.error(error.stack)
    return process.exit(1)
  }
}

module.exports = { estimoPageMode }
