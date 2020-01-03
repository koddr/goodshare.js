if (process.env.ESTIMO_DISABLE) process.exit()

const { findChrome } = require('./chromeDetection')

findChrome()
