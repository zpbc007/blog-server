import { Controller, Get, UseGuards, UsePipes, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TagsService } from './tags.service';
import { TagModifyDto } from './dto/tag_modify.dto';
import { Result } from 'src/common/dto/result.dto';
import { ServiceResult } from 'src/common/interface/service_result.interface';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagService: TagsService,
    ) {}

    /**
     * 获取标签列表
     */
    @Get('/')
    @UseGuards(AuthGuard())
    async tagList() {
        return await this.tagService.findAll();
    }

    /**
     * 新建、保存 标签
     */
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Post('/')
    async createTag(@Body() tagModifyDto: TagModifyDto) {
        let result: ServiceResult<number>;
        if (tagModifyDto.id) {
            result = await this.tagService.editTag(tagModifyDto);
        } else {
            result = await this.tagService.addTag(tagModifyDto);
        }

        return new Result(result.msg, result.data);
    }
}
