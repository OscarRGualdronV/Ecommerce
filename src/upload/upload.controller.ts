import { BadRequestException, Controller, Param, ParseFilePipeBuilder, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor} from '@nestjs/platform-express'
import { memoryStorage} from 'multer'
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';


@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('uploadImage/:id')
  @UseInterceptors(
    FileInterceptor('file', {storage: memoryStorage()})
  )
  async uploadImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({
        fileType: /(jpeg|jpg|png|avif)$/,
      })
      .addMaxSizeValidator({
        maxSize: 200 * 1024,
      })
      .build({
        exceptionFactory: () => 
          new BadRequestException('El archivo debe ser JPG/PNG y no exceder 200 KB')
      })
    ) file: Express.Multer.File,
  ){
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    const filename = file.originalname.split('.')[0];
    const { secureUrl, publicId } = await this.uploadService.uploadImage(
      file.buffer,
      filename,
      id,
    );

    return {
      message: 'Imagen actualizada con éxito',
      imageUrl: secureUrl,
      publicId,
    };
  }

}
