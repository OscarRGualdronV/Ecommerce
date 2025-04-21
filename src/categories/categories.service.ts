import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { categoriesSeed } from 'src/seeder/categories/categories.mock';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ){}

  async preloadCategories(){
    const existingCategories = await this.repo.find();
    const existingNames = existingCategories.map(category => category.name.toLowerCase());

    const newCategories = categoriesSeed.filter(
      seed => !existingNames.includes(seed.name.toLowerCase()),
    );

    if (newCategories.length === 0) {
      return {message: 'No hay categorias nuevas para insertar'};
    }

    await this.repo.save(newCategories);
    return {message: 'CAtegorias precargadas correctamente'};
  }

  async getCategories(){
    return this.repo.find();
  }

}
