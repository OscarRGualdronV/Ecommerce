import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary} from 'cloudinary';
import { ProductsService } from '../products/products.service';


@Injectable()
export class UploadService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
    private readonly productsService: ProductsService,
  ){}

  async uploadImage(
    fileBuffer: Buffer, 
    filename: string, 
    productId: string): Promise<{secureUrl: string, publicId: string}>{
    if (!fileBuffer) {
      throw new BadRequestException('No se envió ningún archivo')
    }

    // 1. Subir a Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      this.cloudinary.uploader
      .upload_stream(
        {folder: 'uploads', public_id: filename},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      )
      .end(fileBuffer);
    });
    
    // 2. Actualizar la URL en la base de datos
    const secureUrl = uploadResult.secure_url as string;
    await this.productsService.updateImageUrl(productId, secureUrl);

    return {
      secureUrl,
      publicId: uploadResult.public_id as string,
    }
  }
}
