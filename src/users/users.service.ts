import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(UserEntity)
    private readonly userOrmRepository: Repository<UserEntity>,
    private readonly userRepository: UsersRepository,
  ){}

  async findAll(page?: number, limit?: number){
    return await this.userRepository.findAll(page, limit);
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userOrmRepository.findOne({where: { id }})
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, name, password, address, phone, country, city } = createUserDto

    const userExist = await this.userOrmRepository.findOne({where: {email}});
    
    if (userExist) {
      throw new Error('Usuario con este email ya existe')
    }

    const user = this.userOrmRepository.create({
      email,
      name,
      password, // Es recomendable encriptar la contraseña antes de guardarla.
      address,
      phone,
      country,
      city,

    })

    return this.userOrmRepository.save(user)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>{
    const user = await this.userOrmRepository.findOne({where: { id}});
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    Object.assign(user, updateUserDto);
    return this.userOrmRepository.save(user)
  }

  async remove(id: string): Promise<{message:string}>{
    const user = await this.userOrmRepository.findOne({where: {id}});

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`)
    }
    await this.userOrmRepository.remove(user);
    return {message: `Usuario con id ${id} eliminado con éxito`}
  }

  async findByEmail(email: string): Promise<UserEntity>{
    return this.userOrmRepository.findOne({where: { email }});
  }

}
