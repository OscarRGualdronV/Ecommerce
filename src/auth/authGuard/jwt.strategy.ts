import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any){

        console.log('Payload recibido en validate:', payload);
        
        if (!payload || !payload.sub || !payload.role) {
            throw new UnauthorizedException('Token inválido o incompleto');
        }
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        }
    }
}