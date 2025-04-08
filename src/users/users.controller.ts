import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(){
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.usersService.findOne(+id)
  }

  @Post()
  create(@Body() userData: CreateUserDto){
    return this.usersService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: UpdateUserDto){
    return this.usersService.update(+id, userData)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.usersService.remove(+id)
  }

}
