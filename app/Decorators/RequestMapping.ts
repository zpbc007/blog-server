import 'reflect-metadata'
import { pathFormat } from '../../util/Path'

const symbolRequestMappingKey = Symbol.for('router:basic')

// 用于class的注解
function RequestMapping (path: string): Function {
    path = pathFormat(path)
    return function (target: any) {
        Reflect.defineMetadata(symbolRequestMappingKey, path, target)
    }
}

export {
    RequestMapping,
    symbolRequestMappingKey
}