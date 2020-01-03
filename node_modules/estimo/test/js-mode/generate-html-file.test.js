const fs = require('fs')
const test = require('ava')
const path = require('path')
const { resolvePathToTempDir } = require('../../src/utils')
const { removeAllFiles } = require('../../src/utils')
const { generateHtmlFile, createHtmlContent } = require('../../src/js-mode/generate-html-file')

test('should properly generate content for html file', (t) => {
  const lib1 = 'https://unpkg.com/react@16/umd/react.development.js'

  t.is(
    createHtmlContent(lib1),
    `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Estimo Template</title>
  </head>
  <body>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <h1>Estimo</h1>
  </body>
</html>`,
  )
})

test('should properly create html file for one library', async (t) => {
  const lib1 = 'https://unpkg.com/react@16/umd/react.development.js'
  const htmlFile = await generateHtmlFile(lib1, createHtmlContent(lib1))

  t.is(fs.existsSync(htmlFile), true)
  t.is(htmlFile, resolvePathToTempDir(path.basename(htmlFile)))

  await removeAllFiles([htmlFile])
})

test('should properly create html for few libraries', async (t) => {
  const lib1 = 'https://unpkg.com/react@16/umd/react.development.js'
  const lib2 = 'https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.production.min.js'

  const htmlFile1 = await generateHtmlFile(lib1, createHtmlContent(lib1))
  const htmlFile2 = await generateHtmlFile(lib2, createHtmlContent(lib2))

  t.is(fs.existsSync(htmlFile1), true)
  t.is(htmlFile1, resolvePathToTempDir(path.basename(htmlFile1)))

  t.is(fs.existsSync(htmlFile2), true)
  t.is(htmlFile2, resolvePathToTempDir(path.basename(htmlFile2)))

  await removeAllFiles([htmlFile1, htmlFile2])
})

