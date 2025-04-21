import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { productsSeed } from 'src/seeder/products/products.mock';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ){}

findAll(page: number, limit: number){
  return this.productsRepository.findAll(page, limit);
}

findOne(id: number):ProductEntity{
  return this.productsRepository.findById(id);
}

create(productData: CreateProductDto):ProductEntity{
  return this.productsRepository.create(productData);
}

update(id:number, productData: UpdateProductDto){
  return this.productsRepository.update(id, productData);
}

remove(id: number){
  return this.productsRepository.remove(id);
}

async preloadProducts() {
  const products = await this.productRepository.find();
  if (products.length > 0) return { message: 'Productos ya cargados' };

  for (const product of productsSeed) {
    const category = await this.categoryRepository.findOneBy({ name: product.category });
    if (!category) continue;

    const exist = await this.productRepository.findOneBy({ name: product.name });
    if (exist) continue;

    await this.productRepository.save({
      ...product,
      category,
    });
  }

  return { message: 'Productos cargados correctamente' };
}

}

