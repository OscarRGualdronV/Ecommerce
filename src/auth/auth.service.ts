import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
constructor(
  private readonly userService: UsersService,
  private readonly jwtService: JwtService,
){}

async signUp(signUpDto: SignUpDto){
  const { password, passwordConfirmation, email, name, address, phone, country, city} = signUpDto;

  // 1. Validar contraseña y confirmación
  if (password !== passwordConfirmation) {
    throw new BadRequestException('La contraseña y su confirmación no coinciden');
  }

  // 2. Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
 

  // 3. Crear usuario con la BD
  try {
    const createdUser = await this.userService.create({
      email,
      name,
      password: hashedPassword,
      address,
      phone,
      country,
      city,
    });

    // 4. Eliminar password del retorno
    const { password: _, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  } catch(err: any){
    if (err.response?.message?.includes('existe') ||
        err.code === '23505'
  ) {
      throw new ConflictException('Usuario con este email ya existe');
    }
    throw err;
  }
}

async signIn(signInDto: SignInDto){
  const { email, password } = signInDto;

  // 1. Busca el usuario por email
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // 2. Compara la contraseña con bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Credenciales inválidas')
  }

  // 3. Preparar el payload y firma el token
  const payload = { 
    sub: user.id, 
    email: user.email,
    role: user.isAdmin ? 'admin' : 'user',
  };
  const accessToken = this.jwtService.sign(payload);

  // 4. Devuelve el token y datos publicos del usuario
  const { password:_, ...userWithoutPassword} = user;
  return {
    accessToken,
    user: userWithoutPassword,
  };
}
}
