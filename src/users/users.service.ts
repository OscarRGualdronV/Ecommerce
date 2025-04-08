import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository){}

  findAll(): User[] {
    return this.userRepository.findAll();
  }

  findOne(id: number): User | undefined {
    return this.userRepository.findById(id);
  }

  create(userData: CreateUserDto): User {
    return this.userRepository.create(userData);
  }

  update(id: number, userData: UpdateUserDto){
    return this.userRepository.update(id, userData);
  }

  remove(id: number){
    return this.userRepository.remove(id);
  }
}
