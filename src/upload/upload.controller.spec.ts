import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/authGuard/auth.guard';
import { BadRequestException, ExecutionContext } from '@nestjs/common';

describe('UploadController', () => {
  let controller: UploadController;
  let uploadService: UploadService;

  const mockUploadService = {
    uploadImage: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [{
        provide: UploadService, useValue: mockUploadService
      }],
    }).overrideGuard(JwtAuthGuard)
    .useValue({
      canActive: (context: ExecutionContext) => true,
    }).compile();

    controller = module.get<UploadController>(UploadController);
    uploadService = module.get<UploadService>(UploadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadImage', () => {
    const mockFile = {
      originalname: 'test-image.jpg',
      buffer: Buffer.from('test'),
    } as Express.Multer.File;

    it('Debe lanzar BadRquestException si no se proporciona el archivo', async () => {
      await expect(
        controller.uploadImage('some-uuid', undefined as unknown as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });

    it('debe cargar el archivo y devolver una respuesta correcta', async () => {
      const uploadResult = {
        secureUrl: 'https://cloudinary.com/test-image.jpg',
        publicId: 'uploads/test-image',
      };

      mockUploadService.uploadImage.mockResolvedValue(uploadResult);

      const result = await controller.uploadImage('some-uuid', mockFile);

      expect(result).toEqual({
        message: 'Imagen actualizada con éxito',
        imageUrl: uploadResult.secureUrl,
        publicId: uploadResult.publicId,
      })
    })
  })
});
