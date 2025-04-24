import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() signUpDto: SignUpDto){
    const user = await this.authService.signUp(signUpDto);
    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  @Post('signin')
  async signIn(@Body() signinDto: SignInDto){
    return this.authService.signIn(signinDto);
  }
}
