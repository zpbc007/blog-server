import { RequestMapping } from "../Decorators/RequestMapping";
import { Get, Post } from "../Decorators/HttpMethods";
import { Path } from "../Decorators/Path";
import { Context } from "koa";

// 测试页面
@RequestMapping('test')
class TestController {
    @Get
    @Path('flowData')
    method1 (ctx: Context) {
        ctx.body = 'method1'
    }
}

export {
    TestController
}