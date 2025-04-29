import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ProductsService } from 'src/products/products.service';
import { v2 as Cloudinary} from 'cloudinary'
import { BadRequestException } from '@nestjs/common';

describe('UploadService', () => {
  let service: UploadService;
  let productsService: ProductsService;
  let cloudinary: typeof Cloudinary;

  const mockCloudinary = {
    uploader: {
      upload_stream: jest.fn()
    },
  };

  const mockProducsService = {
    updateImageUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
      {provide: 'CLOUDINARY', useValue: mockCloudinary},
      {provide: ProductsService, useValue: mockProducsService},
    ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    productsService = module.get<ProductsService>(ProductsService);
    cloudinary = module.get<typeof Cloudinary>('CLOUDINARY');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    it('debe lanzar BadRequestException si no se proporciona ningún fileBuffer', async () => {
      await expect(
        service.uploadImage(undefined as unknown as Buffer, 'filename', 'productId'),
      ).rejects.toThrow(BadRequestException);
    });

    it('debe cargar la imagen y actualizar la URL de la imagen del producto', async () => {
      const fakeBuffer = Buffer.from('test');
      const fakeUploadResult = {
        secure_url: 'https://cloudinary.com/test-image.jpg',
        public_id: 'uploads/filename',
      };

      // Mock de upload_stream para que funcione como una promesa
      (mockCloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (options: any, callback: Function) => {
          const stream = {
            end: () => callback(null, fakeUploadResult),
          };
          return stream;
        },
      );

      mockProducsService.updateImageUrl.mockResolvedValue(true);

      const result = await service.uploadImage(fakeBuffer, 'filename', 'productId');

      expect(result).toEqual({
        secureUrl: fakeUploadResult.secure_url,
        publicId: fakeUploadResult.public_id,
      });

      expect(mockProducsService.updateImageUrl).toHaveBeenCalledWith(
        'productId',
        fakeUploadResult.secure_url,
      );
    });

    it('debería lanzarse si se produce un error en la carga de Cloudinary', async () => {
      const fakeBuffer = Buffer.from('test');

      (mockCloudinary.uploader.upload_stream as jest.Mock).mockImplementation(
        (options: any, callback: Function) => {
          const stream = {
            end: () => callback(new Error('Upload failed'), null),
          };
          return stream;
        },
      );

      await expect(
        service.uploadImage(fakeBuffer, 'filename', 'productId'),
      ).rejects.toThrow('Upload failed');
    });
  })
});
