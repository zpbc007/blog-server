import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ArticlesService } from '../articles/articles.service';
import { UserModifyDto } from '../users/dto/user_modify.dto';
import { TagModifyDto } from '../tags/dto/tag_modify.dto';
import { TagsService } from '../tags/tags.service';
import { ArticleModifyDto } from '../articles/dto/article_modify.dto';
import { Users } from 'dist/src/module/users/entity/users.entity';
import { Color } from 'src/common/types/color.enum';

@Injectable()
export class MockService {
    constructor(
        private readonly userService: UsersService,
        private readonly articleService: ArticlesService,
        private readonly tagService: TagsService,
    ) {}

    /**
     * 生成mock数据
     */
    async genMockData() {
        const tagList = await this.genTag();
        const userList = await this.genUser();
        const user = new Users();
        user.id = userList[0];
        const articleList = await this.genArticle(user);

        return {
            tagList,
            userList,
            articleList,
        };
    }

    /**
     * 生成用户
     */
    async genUser() {
        const user1 = new UserModifyDto();
        user1.account = 'zpbc001';
        user1.enable = true;
        user1.nickname = 'zp01';

        const user2 = new UserModifyDto();
        user2.account = 'zpbc002';
        user2.enable = true;
        user2.nickname = 'zp02';

        const [{ data: userId1 }, { data: userId2 }] = await Promise.all([this.userService.addUser(user1), this.userService.addUser(user2)]);

        return [userId1, userId2];
    }

    /**
     * 生成标签
     */
    async genTag() {
        const tag1 = new TagModifyDto();
        tag1.desc = '测试标签描述1';
        tag1.name = '标签1';
        tag1.color = Color.blue;

        const tag2 = new TagModifyDto();
        tag2.desc = '测试标签描述2';
        tag2.name = '标签2';
        tag2.color = Color.cyan;

        const [{ data: tagId1 }, { data: tagId2 }] = await Promise.all([this.tagService.addTag(tag1), this.tagService.addTag(tag2)]);

        return [tagId1, tagId2];
    }

    /**
     * 生成文章
     */
    async genArticle(user) {
        const article1 = new ArticleModifyDto();
        article1.desc = '测试文章描述1';
        article1.title = '测试文章标题2';
        article1.content = '测试文章内容1 \n 123123 \n 123123 ';

        const article2 = new ArticleModifyDto();
        article2.desc = '测试文章描述2';
        article2.title = '测试文章标题2';
        article2.content = '测试文章内容2 \n 123123 \n 123123 ';

        const [
            { data: articleId1 },
            { data: articleId2 },
        ] = await Promise.all([this.articleService.addArticle(article1, user), this.articleService.addArticle(article2, user)]);

        return [articleId1, articleId2];
    }
}
