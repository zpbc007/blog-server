import { symbolHttpMethodsKey } from "./Decorators/httpMethods"
import { symbolPathKey } from "./Decorators/path"
import { symbolRequestMappingKey } from "./Decorators/RequestMapping"
const router = require('koa-router')()

/**
 * 遍历注册Controller
 * @param controllerList 
 */
function registerController (controllerList: [any]) {
    for (let controller of controllerList) {
        let ins = new controller()
        // RequestMapping参数
        let basic = Reflect.getMetadata(symbolRequestMappingKey, controller)
        for (let methodName in ins) {
            let method = ins[methodName]
            if (typeof method !== 'function') continue
            // 反射得到挂载的数据
            let httpMethod = Reflect.getMetadata(symbolHttpMethodsKey, ins, methodName),
                path = Reflect.getMetadata(symbolPathKey, ins, methodName),
                fullPath = ''
            if (basic) {
                fullPath = `${basic}${path}`
            } else {
                fullPath = `${path}`
            }
            router[httpMethod](fullPath, method)

            console.log(` path: ${fullPath}\n method: ${httpMethod}`)
        }
    }
}

const routes = router.routes()

export {
    routes,
    registerController
}

