import { BadRequestException, Controller, Param, ParseFilePipeBuilder, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor} from '@nestjs/platform-express'
import { memoryStorage} from 'multer'
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';


@ApiTags('Subida de archivos')
@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('uploadImage/:id')
  @UseInterceptors(
    FileInterceptor('file', {storage: memoryStorage()})
  )
  @ApiOperation({ summary: 'Sube una imagen para un recurso específico (solo admin)' })
  @ApiParam({
    name: 'id',
    description: 'UUID del recurso relacionado con la imagen',
    example: 'a5f3c6a3-6f1d-4e2a-a8e0-9a51c4320fa3',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Imagen en formato JPG, PNG o AVIF (máximo 200 KB)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Imagen subida exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'El archivo debe ser JPG/PNG y no exceder 200 KB',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
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
