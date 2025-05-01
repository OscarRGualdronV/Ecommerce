import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';
import { Role } from '../common/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos paginados' })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: String, example: '5' })
  @ApiResponse({ status: 200, description: 'Lista de productos paginada.' })
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '5'
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    return await this.productsService.findAll(pageNumber, limitNumber);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto (UUID)' })
  @ApiResponse({ status: 200, description: 'Datos del producto.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto (solo admin)' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  async create(@Body() productData: CreateProductDto) {
    const newProduct = await this.productsService.create(productData);
    return {id: newProduct.id}
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un producto (solo admin)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto (UUID)' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente.' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() productData: UpdateProductDto) {
    const updateProduct = await this.productsService.update(id, productData);
    return {id: updateProduct.id};
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un producto (solo admin)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto (UUID)' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.productsService.remove(id);
    return result;
  }

}
