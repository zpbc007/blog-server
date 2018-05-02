import 'reflect-metadata'

const symbolHttpMethodsKey = Symbol('router:httpMethod')

function Get (target: any, propertyKey: string) {
    Reflect.defineMetadata(symbolHttpMethodsKey, 'get', target, propertyKey)
}

function Post (target: any, propertyKey: string) {
    Reflect.defineMetadata(symbolHttpMethodsKey, 'post', target, propertyKey)
}

export {
    symbolHttpMethodsKey,
    Get,
    Post
}