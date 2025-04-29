import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/authGuard/auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: UsersService, useValue: mockUsersService},
      ],
    }).overrideGuard(JwtAuthGuard)
    .useValue({canActive: (context: ExecutionContext) => true})
    .overrideGuard(RolesGuard)
    .useValue({canActive: (context: ExecutionContext) => true})
    .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Debe retornar lista de usuarias paginados', async () => {
      const mockUsers = [{id: '1', name: 'User1'}];
      mockUsersService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll('1', '5');

      expect(result).toEqual(mockUsers);
      expect(mockUsersService.findAll).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('findOne', () => {
    it('Debe retornar usuario sin password si se encuentra', async () => {
      const user = { id: '1', name: 'User1', password: 'secret' };
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('1');

      expect(result).toEqual({ id: '1', name: 'User1' });
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });

    it('Debe retornar un mensaje si no se encuentra el usuario', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('1');

      expect(result).toEqual({ message: 'Usuario no encontrado' });
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('Debe actualizar y returnar el Id del usuario actualizado', async () => {
      const updatedUser = { id: '1', name: 'Updated User' };
      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', { name: 'Updated User' });

      expect(result).toEqual({ id: '1' });
      expect(mockUsersService.update).toHaveBeenCalledWith('1', { name: 'Updated User' });
    });
  });

  describe('remove', () => {
    it('Debe eliminar un usuario y retornar el resutlado', async () => {
      const deleteResult = { deleted: true };
      mockUsersService.remove.mockResolvedValue(deleteResult);

      const result = await controller.remove('1');

      expect(result).toEqual(deleteResult);
      expect(mockUsersService.remove).toHaveBeenCalledWith('1');
    })
  })
});
