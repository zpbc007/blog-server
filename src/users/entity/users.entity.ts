import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Articles } from 'src/articles/entity/articles.entity';

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
    @Column()
    avatar: string;

    /**
     * 昵称
     */
    @Column({
        length: 30,
    })
    nickname: string;

    /**
     * 是否启用
     */
    @Column()
    enable: boolean;

    /**
     * 文章列表
     */
    @OneToMany(type => Articles, article => article.create_user)
    article_list: Articles[];
}
