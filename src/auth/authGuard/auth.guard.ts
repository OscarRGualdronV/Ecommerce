import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED)
    }

    const authFormat = authHeader.split(' ');

    if (authFormat.length !== 2 || authFormat[0] !== 'Basic') {
      throw new HttpException('Formato de autorización inválido. Debe ser "Basic <email>:<password>', HttpStatus.UNAUTHORIZED);
    }

    const credentialsBase64 = authFormat[1];
    const decodedCredentials = Buffer.from(
      credentialsBase64, 
      'base64'
    ).toString('utf-8');

    console.log("Credenciales decodificadas", decodedCredentials);

    const [email, password] = decodedCredentials.split(':');

    if (!email || !password) {
      throw new HttpException('Credenciales incompletas', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
