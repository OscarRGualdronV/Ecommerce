
import { OrderEntity } from 'src/orders/entities/order.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length: 100, unique:true, nullable: true})
    email: string;

    @Column({length:80})
    name: string;

    @Column({length:60, nullable: true})
    password: string;

    @Column({length:80})
    address: string;

    @Column({type: 'bigint'})
    phone: string;

    @Column({length:20, nullable:true})
    country?: string;

    @Column({length:20, nullable:true})
    city?: string;

    @OneToMany(() => OrderEntity, order => order.user, {
        cascade: true,
    })
    orders: OrderEntity[];
}
