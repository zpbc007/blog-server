import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Articles } from 'src/module/articles/entity/articles.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 账号
     */
    @Column({
        length: 30,
    })
    account: string;

    /**
     * 密码
     */
    @Column()
    verifi_token: string;

    /**
     * 头像
     */
    @Column({
        nullable: true,
    })
    avatar?: string;

    /**
     * 昵称
     */
    @Column({
        length: 30,
        nullable: true,
    })
    nickname?: string;

    /**
     * 是否启用
     */
    @Column()
    enable: boolean;

    /**
     * 管理员权限
     */
    @Column()
    super: boolean;

    /**
     * 文章列表
     */
    @OneToMany(type => Articles, article => article.create_user)
    article_list?: Articles[];
}
