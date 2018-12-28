import { IsDefined, IsEnum } from 'class-validator';
import { Tags } from '../entity/tags.entity';
import { Color } from 'src/common/types/color.enum';

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

    @IsDefined({
        message: '标签需要指定颜色',
    })
    @IsEnum(Color, {
        message: '只能选取特定颜色',
    })
    color: Color;
}

export function getTagEntityFromDto(dto: TagModifyDto) {
    const entity = new Tags();

    entity.id = dto.id;
    entity.desc = dto.desc;
    entity.name = dto.name;
    entity.color = dto.color;

    return entity;
}
