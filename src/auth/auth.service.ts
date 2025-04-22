import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
constructor(private readonly userService: UsersService){}

async signIn(logindto: LoginDto): Promise<string>{
  const user = await this.userService.findByEmail(logindto.email);
  if (user && user.password === logindto.password) {
    return 'Login exitoso';
  } 
  throw new UnauthorizedException('Email o password incorrectos. Por favor, intenta de nuevo.')
}
}
