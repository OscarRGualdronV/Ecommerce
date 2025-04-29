import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          signUp: jest.fn(),
          signIn: jest.fn(),
        },
      }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach( () => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('debería registrar un usuario exitosamente', async () => {
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
        address: signUpDto.address,
        phone: signUpDto.phone,
        country: signUpDto.country,
        city: signUpDto.city,
        isAdmin: false,
      };

      (authService.signUp as jest.Mock).mockResolvedValue(createdUser);

      const response = await authController.signup(signUpDto);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(response).toEqual({
        message: 'Usuario registrado exitosamente',
        user: createdUser,
      });
    });
  });

  describe('signIn', () => {
    it('debería iniciar sesión exitosamente', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const token = {
        access_token: 'jwt-token-example',
      };

      (authService.signIn as jest.Mock).mockResolvedValue(token);

      const response = await authController.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
      expect(response).toEqual(token);
    });
  });
});
