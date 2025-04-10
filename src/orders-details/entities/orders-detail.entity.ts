import { OrderEntity } from "src/orders/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity({
    name: 'order_details'
})
export class OrdersDetailEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({precision:10, scale:2, type:'numeric'})
    price: number;


    @ManyToOne(() => OrderEntity, order => order.details)
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;

    @ManyToMany(() => ProductEntity, (product) => product.orderDetails)
    @JoinTable({
    name: 'order_details_products',
    joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
    })
    products: ProductEntity[];
}
