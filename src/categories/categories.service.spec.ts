import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriesService', () => {
  let categoryService: CategoriesService;
  let repository: jest.Mocked<Repository<CategoryEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: mockRepository,
        }
      ],
    }).compile();

    categoryService = module.get<CategoriesService>(CategoriesService);
    repository = module.get(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('getCategories', () => {
    it('debería retornar una lista de categorías', async () => {
      const expectedCategories: CategoryEntity[] = [
        { id: '1', name: 'Frutas' } as CategoryEntity,
        { id: '2', name: 'Verduras' } as CategoryEntity,
      ];

      repository.find.mockResolvedValue(expectedCategories);

      const result = await categoryService.getCategories();
      expect(result).toEqual(expectedCategories);
      expect(repository.find).toHaveBeenCalled();
    })
  })

});
