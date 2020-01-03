const fs = require('fs')
const test = require('ava')
const path = require('path')
const nanoid = require('nanoid')
const {
  resolvePathToTempDir,
  readFile,
  writeFile,
  deleteFile,
  getUrlToHtmlFile,
  megabitsToBytes,
  getLibraryName,
  isJsFile,
  isUrl,
  splitResourcesForEstimo,
} = require('../src/utils')

test('[resolvePathToTempDir]: should properly resolve path to file in temp directory', (t) => {
  const fileName = 'someFile.txt'
  const customTempDir = '../test/__mock__/'

  t.is(resolvePathToTempDir(fileName), path.join(__dirname, '../temp/', fileName))

  t.is(resolvePathToTempDir(fileName, customTempDir), path.join(__dirname, customTempDir, fileName))
})

test('[readFile]: should properly read data from file', async (t) => {
  const customTempDir = '../test/__mock__/'
  const fileName = `${nanoid()}.txt`
  const fileContent = 'information'
  const filePath = resolvePathToTempDir(fileName, customTempDir)

  let isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)

  await writeFile(filePath, fileContent)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, true)

  const content = await readFile(filePath)
  t.is(content, 'information')

  await deleteFile(filePath)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)
})

test('[writeFile]: should properly write file', async (t) => {
  const customTempDir = '../test/__mock__/'
  const fileName = `${nanoid()}.txt`
  const fileContent = 'information'
  const filePath = resolvePathToTempDir(fileName, customTempDir)

  let isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)

  await writeFile(filePath, fileContent)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, true)

  fs.unlinkSync(filePath)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)
})

test('[deleteFile]: should properly delete file', async (t) => {
  const customTempDir = '../test/__mock__/'
  const fileName = `${nanoid()}.txt`
  const fileContent = 'information'
  const filePath = resolvePathToTempDir(fileName, customTempDir)

  let isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)

  await writeFile(filePath, fileContent)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, true)

  await deleteFile(filePath)
  isFileExist = fs.existsSync(filePath)
  t.is(isFileExist, false)
})

test('[getUrlToHtmlFile]: should properly generate url to local file', (t) => {
  const fileName = 'index.html'
  t.is(
    getUrlToHtmlFile(resolvePathToTempDir(fileName)),
    `file://${path.resolve(path.join(__dirname, '../temp/', fileName))}`,
  )
})

test('[megabitsToBytes]: should properly transform megabits to bytes', async (t) => {
  t.is(megabitsToBytes(0.75), 98304)
  t.is(megabitsToBytes(1.6), 209715.2)
  t.is(megabitsToBytes(13), 1703936)
  t.is(megabitsToBytes(0.33), 43253.76)
})

test('[getLibraryName]: should properly extract library name', async (t) => {
  t.is(getLibraryName('http://qwe.asd/myLib.js'), 'myLib.js')
  t.is(getLibraryName('http://qwe.asd/myLib/some/dir/lib.js'), 'lib.js')
  t.is(getLibraryName('https://qwe.asd/myLib.js'), 'myLib.js')
  t.is(getLibraryName('https://qwe.asd/myLib/core.js'), 'core.js')
  t.is(getLibraryName('./dir/dev/lib/index.js'), 'index.js')
  t.is(getLibraryName('/Users/dev/project/myLib.js'), 'myLib.js')
  t.is(getLibraryName('../myLib.js'), 'myLib.js')
})

test('[isJsFile]: should properly detect js file names', async (t) => {
  t.is(isJsFile('http://qwe.asd/myLib.js'), true)
  t.is(isJsFile('qwe/asd.css'), false)
  t.is(isJsFile('https://qwe.asd/myLib.js'), true)
  t.is(isJsFile('temp/dir/core.js'), true)
  t.is(isJsFile('index.js'), true)
  t.is(isJsFile('./dev/project/myLib.mjs'), true)
  t.is(isJsFile('cvxvx/qw.html'), false)
})

test('[isUrl]: should properly detect web url\'s', async (t) => {
  t.is(isUrl('http://qwe.asd/myLib.js'), true)
  t.is(isUrl('qwe/asd/'), false)
  t.is(isUrl('https://qwe.asd/myLib.js'), true)
  t.is(isUrl('ftp://domain.to/'), false)
  t.is(isUrl('index.js'), false)
  t.is(isUrl('http://qwe.asd/qwe.css'), true)
  t.is(isUrl('https://qwe.asd/zxc.html'), true)
})

test('[splitResourcesForEstimo]: should properly split input to js files and non-js web url\'s', async (t) => {
  t.deepEqual(splitResourcesForEstimo(['http://qwe.asd/myLib.js', 'index.js']), {
    pages: [],
    libraries: ['http://qwe.asd/myLib.js', 'index.js'],
  })
  t.deepEqual(splitResourcesForEstimo([]), { pages: [], libraries: [] })
  t.throws(() => splitResourcesForEstimo(['ftp://domain.to/', 'qwe/asd/']), `Estimo works only with resources which is path to js files OR url to pages (<String> OR <Array<String>>)`)
  t.deepEqual(splitResourcesForEstimo([
    'http://qwe.asd/qwe.css',
    'https://qwe.asd/zxc.html',
    'http://qwe.asd/myLib.js',
    'index.js',
  ]), {
    pages: ['http://qwe.asd/qwe.css', 'https://qwe.asd/zxc.html'],
    libraries: ['http://qwe.asd/myLib.js', 'index.js'],
  })
})
