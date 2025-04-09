import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page = '1', 
    @Query('limit') limit = '5' ){
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;
    return this.usersService.findAll(pageNumber, limitNumber);
    
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string){
    const user =  this.usersService.findOne(+id);
    const {password, ...rest} = user;
    return rest;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userData: CreateUserDto){
    const newUser = this.usersService.create(userData);
    return { id: newUser.id};
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() userData: UpdateUserDto){
    const updatedUser = this.usersService.update(+id, userData);
    return {id: updatedUser.id};
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string){
    this.usersService.remove(+id)
    return {id: +id};
  }

}
