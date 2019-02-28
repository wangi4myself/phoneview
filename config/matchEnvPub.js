var config = require('./index')

exports.matchEnvPub = function () {
    if (process.env.NODE_ENV === 'pub_prod' || process.env.NODE_ENV === 'pub_dev' || process.env.NODE_ENV === 'pub_test') return true
    return false
}

exports.subProp = function () {
    var _subProp
    switch (process.env.NODE_ENV) {
    case 'pub_prod':
        _subProp = config.build
        break
    case 'pub_dev':
        _subProp = config.pubDev
        break
    case 'pub_test':
        _subProp = config.pubTest
        break
    default:
        _subProp = config.build
        break
    }
    return _subProp
}

