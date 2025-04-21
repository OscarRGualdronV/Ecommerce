import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { Repository } from "typeorm";
import { products } from "./products.mock";

@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>, 
    ){}

    async findCategoryByName(category: string){
        const foundCategory = await this.categoryRepository.findOne({
            where: {name: category},
        });
        if (!foundCategory) {
            throw new Error(`Category ${category} not found`);
        }
        return foundCategory;
    }

    async seed(){
        const existingProductName = (await this.productRepository.find()).map(
            (product) => product.name,
        );

        for(const productData of products){
            if (!existingProductName.includes(productData.name)) {
                const product = new ProductEntity();
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                product.stock = productData.stock;
                product.category = await this.findCategoryByName(productData.category);
                await this.productRepository.save(product);
            }
        }
    }
}
