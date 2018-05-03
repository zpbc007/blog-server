import { Get } from "../Decorators/HttpMethods"
import { Path } from "../Decorators/Path"
import { RequestMapping } from "../Decorators/RequestMapping"
import info from '../../assets/info.json'

// 一览页面
@RequestMapping('overview')
class OverviewController {
    @Get
    @Path('docList')
    async getDocList (ctx) {
        ctx.body = info
    }
}

export {
    OverviewController
}