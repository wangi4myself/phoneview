var utils = require('./utils')
var config = require('../config')
var matchEP = require('../config/matchEnvPub')
var isProduction = matchEP.matchEnvPub() // process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? matchEP.subProp().productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ]
}
