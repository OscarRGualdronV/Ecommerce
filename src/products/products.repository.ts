import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productOrmRepository: Repository<ProductEntity>
    ){}

    async findAll(page = 1, limit = 5){
        const [products, totalItems] = await this.productOrmRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                name: 'ASC'
            },
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: products,
            totalItems,
            totalPages,
            currentPage: page
        }
    }

}