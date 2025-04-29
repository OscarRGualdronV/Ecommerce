import { CategoryEntity } from "../../categories/entities/category.entity";
import { OrdersDetailEntity } from "../../orders-details/entities/orders-detail.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'products'
})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column({length:50})
    name:string;

    @Column({type: 'text'})
    description: string;

    @Column({precision:10,scale:2, type:'numeric'})
    price: number;

    @Column({type:'int'})
    stock: number;

    @Column({default:'https://via.placeholder.com/150'})
    imgUrl: string;

    @ManyToOne(()=> CategoryEntity, category => category.products)
    category: CategoryEntity;

    @ManyToMany(() => OrdersDetailEntity, orderDetail => orderDetail.products)
    orderDetails: OrdersDetailEntity[];
}
