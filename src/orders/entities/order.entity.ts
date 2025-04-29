import { OrdersDetailEntity } from "../../orders-details/entities/orders-detail.entity";
import { UserEntity } from "../../users/entities/user.entity";
import {CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'orders'
})
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => UserEntity, user => user.orders, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @OneToMany(() => OrdersDetailEntity, detail => detail.order, {
        cascade: true,
    })
    orderDetails: OrdersDetailEntity[];

}
