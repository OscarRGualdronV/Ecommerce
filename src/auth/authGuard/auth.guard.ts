import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  //. 1. Interceptar errores de Passport antes de handleRequest
  async canActivate(context: ExecutionContext): Promise<boolean>{
    try {
      const result = (await super.canActivate(context)) as boolean;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Token no proporcionado o inválido')
    }
  }

  // 2. Procesa la respuesta de Passport
  handleRequest(err, user, info, context: ExecutionContext) {

      if (err) {
        throw new UnauthorizedException('Token inválido o expirado');
      }


      if (!user) {
        throw new UnauthorizedException('Token no proporcionado o inválido')
      }

      // Convrtir iat y exp de segundos a Date
        const issuedAt = new Date((user.iat as number) * 1000);
        const expiresAt = new Date((user.exp as number) * 1000);

        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/Bogota',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };

        const issuedAtStr = issuedAt.toLocaleString('es-CO', options);
        const expiresAtStr = expiresAt.toLocaleString('es-CO', options);

        user.iat = issuedAtStr;
        user.exp = expiresAtStr;
        
        const req = context.switchToHttp().getRequest();
        req.user = user;

        console.log('Guard req.user:', user);
        
      return user;
  }
}
