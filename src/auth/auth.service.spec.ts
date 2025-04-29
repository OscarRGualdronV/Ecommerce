import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService - signUp', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(() => {
    usersService = {
      create: jest.fn(),
    };
    jwtService = {};
    authService = new AuthService(usersService as UsersService, jwtService as JwtService);
  });

  it('debería lanzar BadRequestException si las contraseñas no coinciden', async () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      passwordConfirmation: 'differentPassword',
      address: 'Test Address',
      phone: '1234567890',
      country: 'Test Country',
      city: 'Test City',
    };

    await expect(authService.signUp(signUpDto)).rejects.toThrow(BadRequestException);
  });

  it('debería crear un usuario exitosamente', async () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      passwordConfirmation: 'password123',
      address: 'Test Address',
      phone: '1234567890',
      country: 'Test Country',
      city: 'Test City',
    };

    const createdUser = {
      id: '1',
      email: signUpDto.email,
      name: signUpDto.name,
      password: 'hashedPassword',
      address: signUpDto.address,
      phone: signUpDto.phone,
      country: signUpDto.country,
      city: signUpDto.city,
      isAdmin: false,
    };

    (usersService.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await authService.signUp(signUpDto);

    expect(usersService.create).toHaveBeenCalled();
    expect(result).toEqual(expect.objectContaining({
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      address: createdUser.address,
      phone: createdUser.phone,
      country: createdUser.country,
      city: createdUser.city,
      isAdmin: createdUser.isAdmin,
    }));

    expect(result).not.toHaveProperty('password');
  });

  it('debería lanzar ConflictException si el usuario ya existe', async () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      passwordConfirmation: 'password123',
      address: 'Test Address',
      phone: '1234567890',
      country: 'Test Country',
      city: 'Test City',
    };

    const error = { code: '23505'};

    (usersService.create as jest.Mock).mockRejectedValue(error);

    await expect(authService.signUp(signUpDto)).rejects.toThrow(ConflictException);
  });
});


describe ('AuthService - signIn', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

    const signInDto = {email: 'test@example.com', password: 'password123'};

    await expect(authService.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
  })

  it('debería lanzar UnauthorizedException si la contraseña no coincide', async () => {
    const user = { id: '1', email: 'test@example.com', password: 'hashedPassword', isAdmin: false };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(false);

    const signInDto = { email: 'test@example.com', password: 'wrongpassword' };

    await expect(authService.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
  });

})
