import Koa from 'koa'
import { routes, registerController } from './router'
import { TestController } from './Controller/TestController'
import { OverviewController } from './Controller/OverviewController'
import { ViewController } from './Controller/ViewController'
import * as path from 'path'

const staticServe = require('koa-static')
const port = '3000'
const app = new Koa()

console.log('正在启动...\n')

// 静态资源
app.use(staticServe(path.resolve(__dirname, '../pages')))
// 注册Controller
registerController([TestController, OverviewController, ViewController], 'api')
// 注册路由
app.use(routes)
// 监听端口
app.listen(port)

console.log(`系统启动成功, 监听端口为${port}\n`)
