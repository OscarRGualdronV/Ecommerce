import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrdersDetailEntity } from 'src/orders-details/entities/orders-detail.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: jest.Mocked<Repository<OrderEntity>>;
  let userRepository: jest.Mocked<Repository<UserEntity>>;
  let orderDetailRepository: jest.Mocked<Repository<OrdersDetailEntity>>;
  let productRepository: jest.Mocked<Repository<ProductEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {provide: getRepositoryToken(OrderEntity), useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn()}},
        {provide: getRepositoryToken(UserEntity), useValue: {findOne: jest.fn()}},
        {provide: getRepositoryToken(OrdersDetailEntity), useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn()}},
        {provide: getRepositoryToken(ProductEntity), useValue: { find: jest.fn(), save: jest.fn()}},
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get(getRepositoryToken(OrderEntity));
    userRepository = module.get(getRepositoryToken(UserEntity));
    orderDetailRepository = module.get(getRepositoryToken(OrdersDetailEntity));
    productRepository = module.get(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('debería lanzar error si el usuario no existe', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        service.createOrder({
          userId: 'fake-user-id',
          products: [{id: 'product1'}]
        })
      ).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar error si un producto no existe', async () => {
      userRepository.findOne.mockResolvedValue({id: 'user1'} as UserEntity);
      productRepository.find.mockResolvedValue([]);

      await expect(
        service.createOrder({
          userId: 'user1',
          products: [{id: 'product1'}]
        })
      ).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar error si un producto no tiene stock', async () => {
      userRepository.findOne.mockResolvedValue({id: 'user1'} as UserEntity);
      productRepository.find.mockResolvedValue([{id: 'product1', stock: 0, name: 'Producto sin stock'} as ProductEntity]);

      await expect(
        service.createOrder({
          userId: 'user1',
          products: [{ id: 'product1'}]
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('debería crear una orden exitosamente', async () => {
      const user = { id: 'user1'} as UserEntity;
      const product = { id: 'product1', stock: 10, price: 100, name: 'Producto 1'} as ProductEntity;
      const mockOrder = {
        id: 'order1',
        date: new Date(),
        user: {
          id: 'user1',
          name: 'Usuario',
          email: 'user@example.com',
          country: 'País',
          city: 'Ciudad',
          phone: '12345',
          address: 'Calle 123',
        } as UserEntity,
        orderDetails: [],
      } as unknown as OrderEntity;

      userRepository.findOne.mockResolvedValue(user);
      productRepository.find.mockResolvedValue([product]);
      orderRepository.create.mockReturnValue(mockOrder);
      orderRepository.save.mockResolvedValue(mockOrder);
      orderDetailRepository.create.mockReturnValue({
        id: 'detail1',
        price: 100,
        order: mockOrder,
        products: [product],
      });

      orderDetailRepository.save.mockResolvedValue({
        id: 'detail1',
        price: 100,
        order: mockOrder,
        products: [product],
      });

      const result = await service.createOrder({
        userId: 'user1',
        products: [{ id: 'product1'}]
      });

      expect(result).toEqual({message: 'Orden creada exitosamente', orderId: mockOrder.id});
      expect(orderRepository.create).toHaveBeenCalledWith( { user });
    });
  });

  describe('getOrder', () => {
    it('debería lanzar error si no encuentra la orden o el detalle', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      orderDetailRepository.findOne.mockResolvedValue(null);

      await expect(service.getOrder('fake-order-id')).rejects.toThrow(NotFoundException);
    });

    it('debería retornar la orden con su usuario y productos', async () => {
      const mockOrder = {
        id: 'order1',
        date: new Date(),
        user: {
          name: 'Oscar',
          email: 'oscar@example.com',
          country: 'Colombia',
          city: 'Bucaramanga',
          phone: '123456789',
          address: 'Calle 2'
        },
      } as OrderEntity;

      const product = {
        id: 'product1',
        name: 'Producto 1',
        description: 'desc',
        price: 100,
        stock: 10,
        imgUrl: 'url-img',
        category: {} as any,    
        orderDetails: [] as any[],
      } as ProductEntity;

      const orderDetail = {
        id: 'orderDetail1',
        price: 100,
        order: mockOrder,
        products: [product]
      } as OrdersDetailEntity;

      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderDetailRepository.findOne.mockResolvedValue(orderDetail);

      const result = await service.getOrder('order1');

      expect(result).toEqual({
        orderId: mockOrder.id,
        date: mockOrder.date,
        user: {
          name: 'Oscar',
          email: 'oscar@example.com',
          country: 'Colombia',
          city: 'Bucaramanga',
          phone: '123456789',
          address: 'Calle 2',
        },
        total: 100,
        products: [
          { id: 'product1', name: 'Producto 1', description: 'desc', price: 100 },
        ],
      });
    })
  })

});
