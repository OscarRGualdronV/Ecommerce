import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { products } from 'src/seeder/products/products.mock';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository,
    @InjectRepository(ProductEntity)
    private readonly productOrmRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ){}

async findAll(page?: number, limit?: number){
  return await this.productsRepository.findAll(page, limit);
}

async findOne(id: string): Promise<ProductEntity>{
  return await this.productOrmRepository.findOne({where: {id}})
}

async create(createProductDto: CreateProductDto):Promise<ProductEntity>{
  const { name, description, price, stock, imgUrl, categoryId} = createProductDto;
  
  const productExist = await this.productOrmRepository.findOne({where: {name}});

  if (productExist) {
    throw new Error(`El producto con el nombre ${name} ya existe`);
  }

  const category = await this.categoryRepository.findOne({where: {id: categoryId}});
  if (!category) {
    throw new Error('La categoria especificada no existe')
  }

  const product = this.productOrmRepository.create({
    name,
    description,
    price,
    stock,
    imgUrl,
    category
  });

  return await this.productOrmRepository.save(product)
}

async update(id:string, updateProductDto: UpdateProductDto): Promise<ProductEntity>{
  const product = await this.productOrmRepository.findOne({where: { id}});
  if (!product) {
    throw new NotFoundException(`Producto con id ${id} no encontrado`);
  }

  Object.assign(product, updateProductDto);
  return this.productOrmRepository.save(product);
}

async remove(id: string): Promise<{message:string}>{
  const product = await this.productOrmRepository.findOne({where: {id}});
  if (!product) {
    throw new NotFoundException(`Producto con id ${id} no encontrado`)
  }
  await this.productOrmRepository.remove(product);
  return {message: `Producto con id ${id} eliminado con éxito`}
}

async updateImageUrl(id: string, url: string): Promise<ProductEntity>{
  await this.productOrmRepository.update(id, {imgUrl: url});
  return this.findOne(id);
}

}

