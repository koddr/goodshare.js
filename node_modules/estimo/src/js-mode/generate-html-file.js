const nanoid = require('nanoid')
const { writeFile, resolvePathToTempDir } = require('../utils')

function createHtmlContent(library) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Estimo Template</title>
  </head>
  <body>
    ${`<script src="${library}"></script>`}
    <h1>Estimo</h1>
  </body>
</html>`
}

async function generateHtmlFile(library, htmlContent) {
  const fileName = resolvePathToTempDir(`${nanoid()}.html`)
  try {
    await writeFile(fileName, htmlContent)
  } catch (error) {
    console.error(error.stack)
    return process.exit(1)
  }
  return fileName
}

module.exports = { generateHtmlFile, createHtmlContent }
