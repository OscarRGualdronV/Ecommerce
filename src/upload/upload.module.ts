import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProductsModule } from 'src/products/products.module';
import { JwtAuthGuard } from 'src/auth/authGuard/auth.guard';

@Module({
  imports:[
    CloudinaryModule, ProductsModule
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
