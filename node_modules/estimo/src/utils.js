const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)
const unlink = promisify(fs.unlink)

function resolvePathToTempDir(fileName, tempDir = '../temp/') {
  return path.join(__dirname, tempDir, fileName)
}

function debugLog(msg) {
  if (process.env.ESTIMO_DEBUG) {
    console.log(msg)
  }
}

async function readFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} - file not exist!`)
    }
    return await read(filePath, 'utf8')
  } catch (error) {
    console.error(error.stack)
    return process.exit(1)
  }
}

async function writeFile(filePath, content) {
  try {
    await write(filePath, content)
    debugLog(`\n[estimo]: The file has been written: ${filePath}\n`)
  } catch (error) {
    console.error(error.stack)
    process.exit(1)
  }
}

async function deleteFile(filePath) {
  try {
    await unlink(filePath)
    debugLog(`\n[estimo]: The file has been removed: ${filePath}\n`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function getUrlToHtmlFile(file) {
  return `file://${path.resolve(file)}`
}

function megabitsToBytes(megabits) {
  return (megabits * 1024 * 1024) / 8
}

async function removeAllFiles(files) {
  for (const file of files) {
    if (file) {
      await deleteFile(file)
    }
  }
}

function getLibraryName(lib) {
  if (/^http/.test(lib)) {
    return lib.substring(lib.lastIndexOf('/') + 1)
  }
  return path.basename(lib)
}

function isJsFile(p) {
  const JS_FILES = /\.m?js$/i
  return JS_FILES.test(path.extname(path.basename(p)))
}

function isUrl(p) {
  const WEB_URLS = /^(https?|file):/
  return WEB_URLS.test(p)
}

function splitResourcesForEstimo(resources) {
  const items = Array.isArray(resources) ? resources : [resources]
  const pages = []
  const libraries = []

  items.forEach(item => {
    if (isJsFile(item)) {
      libraries.push(item)
    } else if (isUrl(item) && !isJsFile(item)) {
      pages.push(item)
    } else {
      throw new Error(
        `Estimo works only with resources which is path to js files OR url to pages (<String> OR <Array<String>>)`,
      )
    }
  })

  return { libraries, pages }
}

module.exports = {
  splitResourcesForEstimo,
  resolvePathToTempDir,
  getUrlToHtmlFile,
  megabitsToBytes,
  getLibraryName,
  removeAllFiles,
  deleteFile,
  writeFile,
  isJsFile,
  readFile,
  debugLog,
  isUrl,
}
