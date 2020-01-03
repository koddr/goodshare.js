const tracium = require('tracium')
const { readFile, debugLog } = require('./utils')

async function generateTasksReport(pathToTraceFile) {
  const content = JSON.parse(await readFile(pathToTraceFile))
  return tracium.computeMainThreadTasks(content, {
    flatten: true,
  })
}

function formatTime(time) {
  return +parseFloat(time).toFixed(2)
}

function getEventsTime(events) {
  const time = events.reduce((acc, cur) => acc + cur.selfTime, 0)
  return formatTime(Math.round(time * 100) / 100)
}

async function generatePrettyReport(resources) {
  const report = []

  for (const item of resources) {
    debugLog(`\n[report]: Processing resource: ${JSON.stringify(item)}\n`)
    const tasks = await generateTasksReport(item.trace)
    const htmlTime = getEventsTime(tasks.filter(({ kind }) => kind === 'parseHTML'))
    const styleTime = getEventsTime(tasks.filter(({ kind }) => kind === 'styleLayout'))
    const renderTime = getEventsTime(tasks.filter(({ kind }) => kind === 'paintCompositeRender'))
    const compileTime = getEventsTime(tasks.filter(({ kind }) => kind === 'scriptParseCompile'))
    const evaluationTime = getEventsTime(tasks.filter(({ kind }) => kind === 'scriptEvaluation'))
    const garbageTime = getEventsTime(tasks.filter(({ kind }) => kind === 'garbageCollection'))
    const otherTime = getEventsTime(tasks.filter(({ kind }) => kind === 'other'))

    report.push({
      name: item.name,
      parseHTML: htmlTime,
      styleLayout: styleTime,
      paintCompositeRender: renderTime,
      scriptParseCompile: compileTime,
      scriptEvaluation: evaluationTime,
      javaScript: formatTime(compileTime + evaluationTime),
      garbageCollection: garbageTime,
      other: otherTime,
      total: formatTime(
        htmlTime + styleTime + renderTime + compileTime + evaluationTime + garbageTime + otherTime,
      ),
    })
  }

  return report
}

module.exports = { generatePrettyReport, formatTime, getEventsTime }
