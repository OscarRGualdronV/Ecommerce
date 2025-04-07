import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userData: Omit<User, 'id'>): User{
    return this.usersService.create(userData);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user =  this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    return user;
  }

  @Get('by-email')
  findByEmail(@Query('email') email: string): User{
    console.log('Recibido en query', email);
    
    const user = this.usersService.findByEmail(email)

    console.log('Usuario no encontrado', user);
    
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    return user;
  }
}
