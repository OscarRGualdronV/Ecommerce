import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes.' })
  async signup(@Body() signUpDto: SignUpDto){
    const user = await this.authService.signUp(signUpDto);
    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Inicio de sesión de usuario' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async signIn(@Body() signinDto: SignInDto){
    return this.authService.signIn(signinDto);
  }
}
