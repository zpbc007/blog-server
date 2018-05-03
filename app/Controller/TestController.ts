import { RequestMapping } from "../Decorators/RequestMapping";
import { Get, Post } from "../Decorators/httpMethods";
import { Path } from "../Decorators/path";
import { Context } from "koa";

@RequestMapping('test')
class TestController {
    @Get
    @Path('method1')
    method1 (ctx: Context) {
        ctx.body = 'method1'
    }

    @Post
    @Path('method2')
    method2 (ctx: Context) {
        ctx.body = 'method2'
    }
}

export {
    TestController
}