import { BadRequestException, Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor} from '@nestjs/platform-express'
import { memoryStorage} from 'multer'


@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(
    FileInterceptor('file', {storage: memoryStorage()})
  )
  async uploadImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
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
