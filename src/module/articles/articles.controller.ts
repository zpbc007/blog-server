import {
    Controller,
    Get,
    Query,
    Post,
    Param,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Body,
    InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '@nestjs/passport';
import { ArticleModifyDto } from './dto/article_modify.dto';
import { User } from 'src/dectorator/user.dectorator';
import { Users } from '../users/entity/users.entity';
import { Result } from 'src/common/dto/result.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    /**
     * 获取文章列表
     */
    @Get('/')
    async getArticleList(@Query('offset') offset: number = 0, @Query('size') size = 10) {
        return this.articlesService.getArticleList(offset, size);
    }

    /**
     * 新建 保存 文章
     */
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Post('/')
    async createArticle(@Body() articleModifyDto: ArticleModifyDto, @User() user: Users) {
        if (articleModifyDto.id) {
            // await this.articlesService.editArticle(articleModifyDto);
        } else {
            const { result, msg, data } = await this.articlesService.addArticle(articleModifyDto, user);

            if (result) {
                return new Result(msg, data);
            }

            throw new InternalServerErrorException();
        }
    }
}
