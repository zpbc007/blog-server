import Koa from 'koa'
import { routes, registerController } from './router'
import { TestController } from './Controller/TestController'
const port = '3000'
const app = new Koa()

console.log('正在启动。。。\n')
registerController([TestController])

app.use(routes)

app.listen(port)
console.log(`系统启动成功, 监听端口为${port}\n`)