import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { CategoriesSeed } from "./categories/categories.seed";
import { ProductsSeed } from "./products/product.seed";

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
    providers:[CategoriesSeed, ProductsSeed],
    exports: [CategoriesSeed, ProductsSeed]
    
})

export class SeedsModule {}