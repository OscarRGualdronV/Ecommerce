import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Put, HttpCode, HttpStatus, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/authGuard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page = '1', 
    @Query('limit') limit = '5' ){
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    return this.usersService.findAll(pageNumber, limitNumber);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string){
    const user =  await this.usersService.findOne(id);
    if (!user) {
      return {message: 'Usuario no encontrado'}
    }
    const {password, ...rest} = user;
    return rest
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userData: CreateUserDto){
    const newUser = await this.usersService.create(userData);
    return { id: newUser.id};
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto){
    const updatedUser = await this.usersService.update(id, userData);
    return {id: updatedUser.id};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string){
    const result = await this.usersService.remove(id);
    return result;
  }

}
