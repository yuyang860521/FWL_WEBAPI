/**
 * 项目启动入口文件
 */

import app from '../app'
import http from 'http'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import config from 'config'
import mongoose from 'mongoose'
import * as models from '../models'
const server = http.createServer(app.callback())
const port = process.env.PORT || config.get("port")

/*
    设置node环境变量：
        windows下命令：set NODE_ENV = [development or production]
        linux下命令：export NODE_ENV = [development or production]
 */
console.log("current NODE_ENV is：%s", process.env.NODE_ENV)

let connect = function() {
    mongoose.connect(config.get("mongodb.url"), config.get("mongodb.options"))
}
connect()
mongoose.connection.on('connected', () => console.log('database is connect successfull'))
mongoose.connection.on('error', err => console.log('database is connect failed：%s', err))
mongoose.connection.on('disconnected', connect)
mongoose.set('debug', config.get("mongodb.debug")) // 生产上关闭数据库脚本调试
let model, key
for(key in models) {
    model = _.lowerFirst(key)
    mongoose.model(model, models[key], 't_'+model)

}

server.listen(port)
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.log(bind + ' is already in use')
            process.exit(1)
            break
        default:
            console.log(error)
            throw error
    }
})
server.on('listening', () => {
    let addr = server.address()
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on %s', bind)
})
