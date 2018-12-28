import { IsDefined } from 'class-validator';
import { Tags } from '../entity/tags.entity';

export class TagModifyDto {
    // 标签 id
    id?: number;

    @IsDefined({
        message: '标签需指定名称',
    })
    name: string;

    @IsDefined({
        message: '标签需指定描述',
    })
    desc: string;
}

export function getTagEntityFromDto(dto: TagModifyDto) {
    const entity = new Tags();

    entity.id = dto.id;
    entity.desc = dto.desc;
    entity.name = dto.name;

    return entity;
}
