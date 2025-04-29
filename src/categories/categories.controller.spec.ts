import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoriesService: jest.Mocked<CategoriesService>;

  beforeEach(async () => {

    const mockCategoriesService = {
      getCategories: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        }
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories', () => {
    it('debería retornar una lista de categorías', async () => {
      const expectedCategories: CategoryEntity[] = [
        { id: '1', name: 'Frutas' } as CategoryEntity,
        { id: '2', name: 'Verduras' } as CategoryEntity,
      ];

      categoriesService.getCategories.mockResolvedValue(expectedCategories);

      const result = await controller.getCategories();
      expect(result).toEqual(expectedCategories);
      expect(categoriesService.getCategories).toHaveBeenCalled();
    })
  })

});
