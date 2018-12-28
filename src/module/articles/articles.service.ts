import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entity/articles.entity';
import { Repository } from 'typeorm';
import { ArticleModifyDto } from './dto/article_modify.dto';
import { Users } from '../users/entity/users.entity';
import { resolve } from 'path';
import { config } from 'server.config';
import { open, write } from 'fs';
import { promisify } from 'util';
import { createServiceResult, ServiceResult } from 'src/common/interface/service_result.interface';
import { createTagList } from '../tags/entity/tags.entity';

const promiseOpen = promisify(open);
const promiseWrite = promisify(write);

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Articles)
        private readonly articleRepo: Repository<Articles>,
    ) {}

    /**
     * 获取文章列表
     * @param offset 偏移
     * @param size 页长
     */
    async getArticleList(offset: number, size: number) {
        return await this.articleRepo
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.tag_list', 'tag_list')
            .skip(offset)
            .take(size)
            .orderBy('article.create_at', 'ASC')
            .getMany();
    }

    /**
     * 创建文章
     */
    async addArticle({ title, desc, tag_list, content }: ArticleModifyDto, user: Users) {
        // 创建对象并保存
        const article = new Articles();
        article.title = title;
        article.desc = desc;
        article.create_user = user;
        article.tag_list = createTagList(tag_list);
        const result = await this.articleRepo.save(article);

        // 文件路径
        const path = this.createFilePathById(result.id);
        try {
            // 创建文件 获取文件描述
            const fd = await promiseOpen(path, 'a');
            // 将内容写入文件
            await promiseWrite(fd, content, 0);

            return createServiceResult(true, '文章创建成功', result.id);
        } catch (e) {
            Logger.error('文章创建失败', e, 'ArticlesService');

            return createServiceResult(false, '文章创建失败', result.id);
        }
    }

    // 根据id生成文件路径
    createFilePathById(id: number) {
        return resolve(config.file.baseDir, `./${id}.md`);
    }
}
