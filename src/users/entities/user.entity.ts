
import { OrderEntity } from 'src/orders/entities/order.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length: 50, unique:true})
    email: string;

    @Column({length:50})
    name: string;

    @Column({length:20})
    password: string;

    @Column({type:'text', nullable:true})
    address: string;

    @Column({type:'bigint', nullable:true})
    phone: string;

    @Column({length:50, nullable:true})
    country?: string;

    @Column({length:50, nullable:true})
    city?: string;

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];
}
