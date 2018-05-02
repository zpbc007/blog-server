import { RequestMapping } from "../Decorators/RequestMapping"
import { Get } from "../Decorators/httpMethods"
import { Path } from '../Decorators/Path'
import { Context } from "koa"
import { join } from 'path'
import { readFile } from '../../util/file'
import { getLanguage, highlight} from 'highlight.js'
import * as idPathMap from '../assets/idToPath.json'

const md = require('markdown-it')({
    highlight: function (str, lang) {
      if (lang && getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
                 highlight(lang, str, true).value +
                 '</code></pre>';
        } catch (__) {}
      }
  
      return md.utils.escapeHtml(str);
    }
})

@RequestMapping('view')
class ViewController {

    private async getHtml (fileName: string) {
        const file = await readFile(join(__dirname, '../docs', fileName))
        return md.render(file)
    }

    @Get
    @Path(':id')
    public async getViewPage (ctx: Context) {
        const filePath = idPathMap[ctx.params.id]
        ctx.body = await this.getHtml(filePath)
    }
}

export {
    ViewController
}