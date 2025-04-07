import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}

  create(produtc: Product): Product {
    return this.productsRepository.create(produtc)
  }

  findAll(): Product[] {
    return this.productsRepository.findAll()
  }

  findOne(id: number): Product | undefined {
    return this.productsRepository.findById(id)
  }

}
