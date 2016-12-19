require('babel-runtime/core-js/promise').default = require('bluebird') // 使用bluebird代替原生promise
require('source-map-support').install()
require('./apiserver/bin/www')
