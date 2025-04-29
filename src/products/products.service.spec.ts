import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: ProductsRepository;
  let productOrmRepository: Repository<ProductEntity>;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
      {
        provide: ProductsRepository,
        useValue: {
          findAll: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          findOne: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          remove: jest.fn(),
          update: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(CategoryEntity),
        useValue: {
          findOne: jest.fn(),
        },
      },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
    productOrmRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('shpuld be defined', () => {
    expect(service).toBeDefined();
  })

  describe('findAll', () => {
    it('debería retornar todos los productos', async () => {
      const expectedResult = ['product1', 'product2'];
      (productsRepository.findAll as jest.Mock).mockResolvedValue(expectedResult);

      const result = await service.findAll(1,5);
      expect(productsRepository.findAll).toHaveBeenCalledWith(1,5);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('debería retornar un producto por ID', async () => {
      const product = { id: '1', name: 'Product 1'} as ProductEntity;
      (productOrmRepository.findOne as jest.Mock).mockResolvedValue(product);

      const result = await service.findOne('1');
      expect(productOrmRepository.findOne).toHaveBeenCalledWith({ where: { id: '1'}});
      expect(result).toEqual(product);
    });
  });

  describe('create', () => {
    it('debería crear un producto nuevo', async () => {
      const dto: CreateProductDto = {
        name: 'Nuevo Producto',
        description: 'desc',
        price: 100,
        stock: 10,
        imgUrl: 'img-URL',
        categoryId: 'cat1'
      };

      (productOrmRepository.findOne as jest.Mock).mockResolvedValue(null);
      (categoryRepository.findOne as jest.Mock).mockResolvedValue({ id: 'cat1'} as CategoryEntity);
      (productOrmRepository.create as jest.Mock).mockReturnValue(dto);
      (productOrmRepository.save as jest.Mock).mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(productOrmRepository.findOne).toHaveBeenCalledWith({ where: {name: dto.name}});
      expect(categoryRepository.findOne).toHaveBeenCalledWith({ where: { id: dto.categoryId}});
      expect(productOrmRepository.create).toHaveBeenCalled();
      expect(productOrmRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });

    it('debería lanzar error si el producto ya existe', async () => {
      const dto: CreateProductDto = {
        name: 'Producto Existente',
        description: 'desc',
        price: 100,
        stock: 10,
        imgUrl: 'img-url',
        categoryId: 'cat1',
      };

      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce({ id: '1' });

      await expect(service.create(dto)).rejects.toThrow(`El producto con el nombre ${dto.name} ya existe`);
    });

    it('debería lanzar error si la categoría no existe', async () => {
      const dto: CreateProductDto = {
        name: 'Nuevo Producto',
        description: 'desc',
        price: 100,
        stock: 10,
        imgUrl: 'img-url',
        categoryId: 'cat1',
      };

      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
      (categoryRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.create(dto)).rejects.toThrow('La categoria especificada no existe');
    });
  });

  describe('update', () => {
    it('debería actualizar un producto', async () => {
      const id = '1';
      const dto: UpdateProductDto = { name: 'Producto Actualizado' };
      const existingProduct = { id: '1', name: 'Producto Viejo' } as ProductEntity;

      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce(existingProduct);
      (productOrmRepository.save as jest.Mock).mockResolvedValue({ ...existingProduct, ...dto });

      const result = await service.update(id, dto);

      expect(productOrmRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(productOrmRepository.save).toHaveBeenCalledWith({ ...existingProduct, ...dto });
      expect(result).toEqual({ ...existingProduct, ...dto });
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.update('invalid-id', {} as UpdateProductDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un producto', async () => {
      const id = '1';
      const product = { id: '1' } as ProductEntity;

      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce(product);
      (productOrmRepository.remove as jest.Mock).mockResolvedValueOnce(undefined);

      const result = await service.remove(id);

      expect(productOrmRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(productOrmRepository.remove).toHaveBeenCalledWith(product);
      expect(result).toEqual({ message: `Producto con id ${id} eliminado con éxito` });
    });

    it('debería lanzar NotFoundException si el producto no existe al eliminar', async () => {
      (productOrmRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateImageUrl', () => {
    it('debería actualizar la imagen del producto', async () => {
      const id = '1';
      const updatedProduct = { id: '1', imgUrl: 'new-url' } as ProductEntity;

      (productOrmRepository.update as jest.Mock).mockResolvedValue(undefined);
      (productOrmRepository.findOne as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await service.updateImageUrl(id, 'new-url');

      expect(productOrmRepository.update).toHaveBeenCalledWith(id, { imgUrl: 'new-url' });
      expect(result).toEqual(updatedProduct);
    })
  })

});
