import { symbolHttpMethodsKey } from "./Decorators/HttpMethods"
import { symbolPathKey } from "./Decorators/path"
import { symbolRequestMappingKey } from "./Decorators/RequestMapping"
import { pathFormat } from "../util/Path";
const router = require('koa-router')()

/**
 * 遍历注册Controller
 * @param controllerList 
 * @param prefix 前缀
 */
function registerController (controllerList: Array<any>, prefix: string) {
    prefix = pathFormat(prefix)
    for (let controller of controllerList) {
        let ins = new controller()
        // RequestMapping参数
        let basic = Reflect.getMetadata(symbolRequestMappingKey, controller)
        for (let methodName in ins) {
            let method = ins[methodName]
            // 跳过属性
            if (typeof method !== 'function') continue
            // 反射得到挂载的数据
            let httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, ins, methodName),
                path = Reflect.getMetadata(symbolPathKey, ins, methodName),
                fullPath = ''
            // 跳过没有添加注解的方法
            if (!httpMethod) continue
            if (basic) {
                fullPath = `${prefix}${basic}${path}`
            } else {
                fullPath = `${prefix}${path}`
            }
            router[httpMethod](fullPath, method.bind(ins))

            console.log(` path: ${fullPath}\n method: ${httpMethod}`)
        }
    }
}

const routes = router.routes()

export {
    routes,
    registerController
}

