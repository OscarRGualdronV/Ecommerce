import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}

findAll():Product[]{
  return this.productsRepository.findAll()
}

findOne(id: number):Product{
  return this.productsRepository.findById(id);
}

create(productData: CreateProductDto):Product{
  return this.productsRepository.create(productData);
}

update(id:number, productData: UpdateProductDto){
  return this.productsRepository.update(id, productData);
}

remove(id: number){
  return this.productsRepository.remove(id);
}

}
