import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userOrmrepository: Repository<UserEntity>
    ){}


    async findAll(page = 1, limit = 5){
        const [users, totalItems] = await this.userOrmrepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                name: 'ASC'
            },
        });

        const totalPages = Math.ceil(totalItems / limit);

        const usersWithoutPassword = users.map(({ password, ...rest}) => rest);

        return {
            data: usersWithoutPassword,
            totalItems,
            totalPages,
            currentPage: page
        }

    }
}