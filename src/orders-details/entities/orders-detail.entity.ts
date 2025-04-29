import { OrderEntity } from "../../orders/entities/order.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity({
    name: 'order_details'
})
export class OrdersDetailEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({precision:10, scale:2, type:'numeric'})
    price: number;


    @ManyToOne(() => OrderEntity, order => order.orderDetails, {
        onDelete: 'CASCADE',
    })
    order: OrderEntity;

    @ManyToMany(() => ProductEntity, (product) => product.orderDetails)
    @JoinTable()
    products: ProductEntity[];
}
