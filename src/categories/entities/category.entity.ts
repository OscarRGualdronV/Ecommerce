import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'categories'
})
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({length:50})
    name:string;

    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];

}
