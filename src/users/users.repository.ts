import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {
    private users: User[] = [];

    createUser(user: User): User{
        this.users.push(user);
        return user;
    }

    getAllUsers(): User[]{
        return this.users;
    }

    findByEmail(email: string): User | undefined{
        return this.users.find(
        user => user.email.trim().toLowerCase() === email.trim().toLowerCase());
    }

    findById(id: number): User | undefined{
        return this.users.find((user) => user.id === id)
    }

}