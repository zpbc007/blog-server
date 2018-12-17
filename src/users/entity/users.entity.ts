import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Articles } from 'src/articles/entity/articles.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
    })
    account: string;

    @Column()
    verifi_token: string;

    @Column()
    avatar: string;

    @Column({
        length: 30,
    })
    nickname: string;

    @Column()
    enable: boolean;

    @OneToMany(type => Articles, article => article.create_user)
    article_list: Articles[];
}
