import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    private users: User[] = [];
    private nextId = 1;

    findAll(): User[]{
        return this.users;
    }
    
    findById(id: number): User {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`Usuaruio con id ${id} no encontrado`);
        }
        return user;
    }
    
    create(userData: CreateUserDto): User{
        const newUser: User = {
            id: this.nextId++,
            ...userData,
        };
        this.users.push(newUser);
        return newUser
    }

    update(id: number, userData: UpdateUserDto): User{
        const index = this.users.findIndex( user => user.id === id);
        if(index === -1) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        this.users[index] = {...this.users[index], ...userData};
        return this.users[index];
    }

    remove(id: number){
        const index = this.users.findIndex(user => user.id === id);
        if(index === -1)throw new NotFoundException(`Usuario con id ${id} no encontrado`);

        this.users.splice(index, 1);
        return {message: `Usuario con id ${id} eliminado con exito`}
    }

}