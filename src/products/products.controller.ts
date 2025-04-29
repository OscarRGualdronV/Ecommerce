import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';
import { Role } from '../common/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '5'
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    return await this.productsService.findAll(pageNumber, limitNumber);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productData: CreateProductDto) {
    const newProduct = await this.productsService.create(productData);
    return {id: newProduct.id}
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() productData: UpdateProductDto) {
    const updateProduct = await this.productsService.update(id, productData);
    return {id: updateProduct.id};
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const result = await this.productsService.remove(id);
    return result;
  }

}
