import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository){}

  create(user: User): User {
    return this.userRepository.createUser(user);
  }

  findAll(): User[] {
    return this.userRepository.getAllUsers();
  }

  findOne(id: number): User | undefined {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string): User | undefined{
    console.log('Buscando usuario con email:', email);
    
    return this.userRepository.findByEmail(email)
  }
}
