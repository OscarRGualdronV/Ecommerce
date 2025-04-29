import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[
    CloudinaryModule, ProductsModule
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
