import { OrdersDetailEntity } from "src/orders-details/entities/orders-detail.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'orders'
})
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => UserEntity,{onDelete: 'CASCADE',})
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

}
