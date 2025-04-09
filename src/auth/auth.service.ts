import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
constructor(private readonly userService: UsersService){}

signIn(logindto: LoginDto){
const user = this.userService.findByEmail(logindto.email);
if (user && user.password === logindto.password) {
  return "Login exitoso";
}
return "Email o Password son incorrectos. Porfavor intenta de nuevo";
}

}
