const { existsSync } = require('fs')
const { getLibraryName, getUrlToHtmlFile, debugLog, isUrl } = require('../utils')
const { createHtmlContent, generateHtmlFile } = require('./generate-html-file')

async function prepareLibrariesForEstimation(libraries) {
  const resources = []

  for (const lib of libraries) {
    debugLog(`\n[js-mode]: ------------------------------------------`)
    debugLog(`[js-mode]: Preparing file: ${lib}`)

    if (!isUrl(lib) && !existsSync(lib)) {
      debugLog(`[js-mode]: Local file: ${lib} - not exist!`)
      throw new Error(`${lib} - file not exist!`)
    }

    const htmlContent = createHtmlContent(lib)
    const html = await generateHtmlFile(lib, htmlContent)
    const name = getLibraryName(lib)
    const url = getUrlToHtmlFile(html)

    debugLog(`[js-mode]: Creating html content for js file: ${lib}`)
    debugLog(`[js-mode]: Js file name: ${name}`)
    debugLog(`[js-mode]: Html file: ${html}`)
    debugLog(`[js-mode]: Url to html file: ${url}`)
    debugLog(`[js-mode]: Html content: ${htmlContent}`)
    debugLog(`[js-mode]: ------------------------------------------\n`)

    resources.push({ name, url, html })
  }

  return resources
}

module.exports = { prepareLibrariesForEstimation }
