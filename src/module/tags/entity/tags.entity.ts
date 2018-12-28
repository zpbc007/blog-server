import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Articles } from 'src/module/articles/entity/articles.entity';
import { Color } from 'src/common/types/color.enum';

@Entity()
export class Tags {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * tag 名称
     */
    @Column()
    name: string;

    /**
     * 描述
     */
    @Column()
    desc: string;

    /**
     * 颜色
     */
    @Column({
        type: 'enum',
        enum: Color,
    })
    color: Color;

    /**
     * 对应的文章列表
     */
    article_list: Articles[];
}

export function createTagList(idList: number[]) {
    if (!idList || idList.length === 0) {
        return [];
    }
    return idList.map(id => ({ id } as Tags));
}
