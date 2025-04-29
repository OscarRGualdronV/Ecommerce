import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct: ProductEntity = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
    imgUrl: 'http://test.com/image.jpg',
    category: {} as any, 
    orderDetails: {} as any,
  }

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Debe retornar productos paginados', async () => {
      mockProductsService.findAll.mockResolvedValue([mockProduct]);
      const result = await controller.findAll('1', '5');
      expect(result).toEqual([mockProduct]);
      expect(service.findAll).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('findOne', () => {
    it('Debe retornar un producto por su Id', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('Debe lanzar NotFoundException si no encuentra el producto', async () => {
      mockProductsService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('non-existing-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('Debe crear un nuevo producto', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        stock: 5,
        imgUrl: 'http://test.com/new-image.jpg',
        categoryId: 'category-123',
      };
      mockProductsService.create.mockResolvedValue({...mockProduct, id: '2'});

      const result = await controller.create(createDto);
      expect(result).toEqual({ id: '2' });
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('Debe actualizar un producto por Id', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
      };
      mockProductsService.update.mockResolvedValue({...mockProduct, ...updateDto});

      const result = await controller.update('1', updateDto);
      expect(result).toEqual({ id: mockProduct.id });
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('Debe remover un producto por su Id', async () => {
      const deleteResult = { message: 'Producto con id 1 eliminado con éxito' };
      mockProductsService.remove.mockResolvedValue(deleteResult);

      const result = await controller.remove('1');
      expect(result).toEqual(deleteResult);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  })
});
