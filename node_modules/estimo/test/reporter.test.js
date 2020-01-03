const test = require('ava')
const { formatTime, getEventsTime } = require('../src/reporter')

test('[formatTime]: should properly format time', t => {
  t.is(formatTime(11.2223123131231), 11.22)
  t.is(formatTime('11.226'), 11.23)
  t.is(formatTime(11), 11.0)
})

test('[getEventsTime]: should properly calculate time which spent by some group of tasks', t => {
  const events1 = [{ selfTime: 11.11 }, { selfTime: 2.43 }, { selfTime: 7.16 }]
  const events2 = [{ selfTime: 80.0 }]
  const events3 = [
    { selfTime: 21.3 },
    { selfTime: 43.0 },
    { selfTime: 0.16 },
    { selfTime: 9.41 },
    { selfTime: 0.40003 },
    { selfTime: 0.0002 },
  ]
  const events4 = []

  t.is(getEventsTime(events1), 20.7)
  t.is(getEventsTime(events2), 80.0)
  t.is(getEventsTime(events3), 74.27)
  t.is(getEventsTime(events4), 0)
})
