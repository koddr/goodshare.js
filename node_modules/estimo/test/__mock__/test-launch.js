const path = require('path')
const estimo = require('../../index')

console.log(__dirname)

const localJsFile = path.join(__dirname, '19kb.js')

;(async () => {
  const reports = await estimo(['https://www.google.com/', localJsFile])
  console.log(reports)
})()
