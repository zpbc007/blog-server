import 'reflect-metadata'
import { pathFormat } from '../../util/Path'
import { Context } from 'koa'

const symbolPathKey = Symbol('router:path')

function Path (path: string): Function {
    path = pathFormat(path)
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Reflect.defineMetadata(symbolPathKey, path, target, propertyKey)

        if (!descriptor.value) return 

        let oldMethod = descriptor.value
        descriptor.value = function (ctx: Context, next: Function) {
            let methodResult = oldMethod.call(this, ctx)
            next()
        }
    }
}

export {
    Path,
    symbolPathKey
}