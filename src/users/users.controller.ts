import { Headers, Controller, Get, Body, Param, Delete, Query, Put, HttpCode, HttpStatus, UseGuards, ParseUUIDPipe, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({summary: 'Obtener todos los usuarios (solo admin)'})
  @ApiQuery({name: 'page', required: false, type: String, example: '1'})
  @ApiQuery({ name: 'limit', required: false, type: String, example: '5' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios paginada.' })
  async findAll(
    @Query('page') page = '1', 
    @Query('limit') limit = '5' ){
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    return this.usersService.findAll(pageNumber, limitNumber);
    
  }

  
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Buscar un usuario por ID (solo admin)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario (UUID)' })
  @ApiResponse({ status: 200, description: 'Datos del usuario sin la contraseña.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string){
    const user =  await this.usersService.findOne(id);
    if (!user) {
      return {message: 'Usuario no encontrado'}
    }
    const {password, ...rest} = user;
    return rest
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un usuario por ID (requiere login)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario (UUID)' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() userData: UpdateUserDto){
    const updatedUser = await this.usersService.update(id, userData);
    return {id: updatedUser.id};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un usuario por ID (requiere login)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario (UUID)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string){
    const result = await this.usersService.remove(id);
    return result;
  }

  @Post('/promote')
  @ApiOperation({summary: 'Promueve un usuario al rol admin'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@example.com'},
        secret: { type: 'string', example: 'supersecreto'}
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Usuario promovido correctamente' })
  @ApiResponse({status: 401, description: 'Acceso no autorizado'})
  async promoteToAdmin(
    @Headers('x-secret-key') secretKey: string,
    @Body('email') email: string,
  ){
    const SECRET = process.env.ADMIN_PROMOTE_SECRET 

    if (secretKey !== SECRET) {
      throw new UnauthorizedException('Clave secreta inválida')
    }

    return await this.usersService.promoteToAdmin(email);
  }

}
