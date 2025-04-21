import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { Repository, In } from "typeorm";
import { categories } from "./categories.mock";

@Injectable()
export class CategoriesSeed {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ){}

    async seed(){

        const categoryNames = categories.map((c)=> c.name);

        const existingCategories = await this.categoryRepository.find({
            where:{name: In(categoryNames)},
    });


        for (const { name } of categories){
            if (!existingCategories.some((category) => category.name === name)) {
                const category = this.categoryRepository.create({name});
                await this.categoryRepository.save(category);
            }
        }

    }
}