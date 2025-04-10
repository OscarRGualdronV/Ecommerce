import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

@Get('seeder')
async seedCategories(){
  return this.categoriesService.preloadCategories();
}

@Get()
async getCategories(){
  return this.categoriesService.getCategories();
}

}
