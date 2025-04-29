import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { skip } from 'node:test';

jest.mock('./users.repository');

describe('UsersService', () => {
  let usersService: UsersService;
  let repository;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(UserEntity));
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {

    it('debería lanzar un ConflictException si el email ya existe', async () => {
      const userEmail = 'usuario@existente.com';

      const user = {
        id: 'uuid',
        email: userEmail,
        name: 'Usuario Existente',
        password: 'password123',
        address: 'calle falsa 123',
        phone: '35115616'
      }

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(user);

      try {
        await usersService.create({ email: userEmail, name: 'Nuevo Usuario', password: 'password456', address: 'calle falsa', phone: '51516116' });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.response.message).toEqual('Usuario con este email ya existe')
      }
    })

    it('debería devolver todos los usuarios, paginados si se especifican los parámetros', async () => {

      const users = [
        {
          id: 'uuid1',
          email: 'user1@example.com',
          name: 'User One',
          address: 'calle 123',
          phone: '123456789',
          country: 'Pais 1',
          city: 'Ciudad 1',
          isAdmin: false,
          orders: [],
        },
        {
          id: 'uuid2',
          email: 'user2@example.com',
          name: 'User Two',
          address: 'calle 456',
          phone: '987654321',
          country: 'Pais 2',
          city: 'Ciudad 2',
          isAdmin: false,
          orders: [],
        },
      ];

      jest.spyOn(usersRepository, 'findAll').mockResolvedValueOnce({
        data: users,
        totalItems: 2,
        totalPages: 1,
        currentPage: 1,
      });

      const result = await usersService.findAll(1,5);

      expect(result).toEqual({
        data: users,
        totalItems: 2,
        totalPages: 1,
        currentPage: 1,
      });

      expect(usersRepository.findAll).toHaveBeenCalledWith(1,5);
    });

    it('debería devolver un usuario por email', async () => {
      const user = {
        id: 'uuid2',
        email: 'user2@example.com',
        name: 'User Two',
        address: 'calle 456',
        phone: '987654321',
        country: 'Pais 2',
        city: 'Ciudad 2',
        isAdmin: false,
        orders: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(user);

      const result = await usersService.findByEmail('user2@example.com');
      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({where: {email: 'user2@example.com'}})
    })
  })
});
