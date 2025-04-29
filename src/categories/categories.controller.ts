import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


@Get()
@ApiOperation({ summary: 'Obtener todas las categorías' })
@ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente.' })
async getCategories(){
  return this.categoriesService.getCategories();
}

}
