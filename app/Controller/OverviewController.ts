import { Get } from "../Decorators/httpMethods"
import { Path } from "../Decorators/path"
import { RequestMapping } from "../Decorators/RequestMapping"
import * as info from '../../assets/info.json'

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