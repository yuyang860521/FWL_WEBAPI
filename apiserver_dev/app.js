import Koa from 'koa'
const app = new Koa()

import _ from 'lodash'
import url from 'url'
import config from 'config'
import convert from 'koa-convert'
import moment from 'moment'
import session from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'


// koa session
app.keys = ['fuwala', 'api'] // 若不加此方法，则存储session报错
app.use(convert(session({
    prefix: "fuwala:software:",
    rolling: true,
    store: new MongoStore(config.get("mongodb")),
    cookie: {
        maxAge: 3600000 * 24,
        httpOnly: true,
        signed: true
    }
})))


//koa 跨域
import cors from 'koa-cors'
app.use(convert(cors({
    credentials: true, // set Access-Control-Allow-Credentials to true
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
})))


// koa字符集
import charset from 'koa-charset'
app.use(convert(charset({
    charset: 'utf8'
})))


// koa HTTP参数解析
import bodyParser from 'koa-bodyparser'
app.use(bodyParser({jsonLimit:'2mb'}))


app.use(async(ctx, next) => {
    const start = new Date()
    await next()        
    const ms = new Date() - start
    const fdate = moment().format('YYYY-MM-DD HH:mm:ss')

    console.log(`${ctx.method} ${ctx.url} - ${ms} - ${fdate}`)
})


app.on("error", function (err, ctx) {
    console.log(err, 'app something error =>');
})


// koa 错误处理
import errorHandler from 'koa-errorhandler'
app.use(convert(errorHandler()))


// 应用路由
import apiRouter from './routers/api'
app.use(apiRouter.routes(), apiRouter.allowedMethods())

export default app
