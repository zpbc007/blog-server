import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Articles } from 'src/articles/entity/articles.entity';

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

    @ManyToMany(type => Articles)
    article_list: Articles[];
}
