import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Imgs {

    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 七牛对应token
     */
    @Column()
    token: string;
}
