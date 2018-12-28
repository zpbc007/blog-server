import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Articles } from 'src/module/articles/entity/articles.entity';

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
