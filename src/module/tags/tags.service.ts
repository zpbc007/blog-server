import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './entity/tags.entity';
import { Repository } from 'typeorm';
import { TagModifyDto, getTagEntityFromDto } from './dto/tag_modify.dto';
import { createServiceResult } from 'src/common/interface/service_result.interface';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tags)
        private readonly tagsRepo: Repository<Tags>,
    ) {}

    /**
     * 查找所有标签
     */
    async findAll() {
        return this.tagsRepo.createQueryBuilder().getMany();
    }

    /**
     * 添加标签
     */
    async addTag(tagModifyDto: TagModifyDto) {
        const tag = getTagEntityFromDto(tagModifyDto);

        try {
            const result = await this.tagsRepo.save(tag);

            return createServiceResult(true, '标签创建成功', result.id);
        } catch (e) {
            Logger.error('创建标签失败', e, 'TagsService');

            throw new InternalServerErrorException();
        }
    }

    /**
     * 编辑标签
     */
    async editTag(tagModifyDto: TagModifyDto) {
        const tag = getTagEntityFromDto(tagModifyDto);

        try {
            const result = await this.tagsRepo.save(tag);

            return createServiceResult(true, '标签编辑成功', result.id);
        } catch (e) {
            Logger.error('标签编辑失败', e, 'TagsService');

            throw new InternalServerErrorException();
        }
    }
}
