import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from 'src/module/users/entity/users.entity';
import { Tags } from 'src/module/tags/entity/tags.entity';

@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 文章标题
     */
    @Column()
    title: string;

    /**
     * 文章简单描述
     */
    @Column()
    desc: string;

    /**
     * 创建者
     */
    @ManyToOne(type => Users, user => user.article_list)
    create_user: Users;

    /**
     * 标签
     */
    @ManyToMany(type => Tags)
    @JoinTable()
    tag_list?: Tags[];

    /**
     * 版本
     */
    @VersionColumn()
    version: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
