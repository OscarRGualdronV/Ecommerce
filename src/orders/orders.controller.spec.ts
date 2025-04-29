import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { products } from 'src/seeder/products/products.mock';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: {
          createOrder: jest.fn(),
          getOrder: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería llamar a service.createOrder con el DTO correcto', async () => {
      const dto: CreateOrderDto = {
        userId: 'user123',
        products: [
          { id: 'product1' },
          { id: 'product2' },
        ],
      };

      const createdOrder = { id: 'order123', ...dto};
      (service.createOrder as jest.Mock).mockResolvedValue(createdOrder);

      const result = await controller.create(dto);

      expect(service.createOrder).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdOrder);
    });
  });

  describe('get', () => {
    it('debería llamar a service.getOrder con el ID correcto', async () => {
      const orderId = 'order123';
      const orderData = {
        orderId: 'order123',
        date: new Date(),
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
      };

      (service.getOrder as jest.Mock).mockResolvedValue(orderData);

      const result = await controller.get(orderId);

      expect(service.getOrder).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(orderData);
    })
  })
});
