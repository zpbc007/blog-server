import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Imgs {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * blog git repo path
     */
    @Column()
    path: string;

    /**
     * 七牛对应token
     */
    @Column()
    token: string;
}
