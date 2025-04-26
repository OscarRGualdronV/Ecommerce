import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(
        context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        
        
        if (!requireRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!requireRoles.includes(user.role)) {
            throw new ForbiddenException('No tienes permiso y no puedes acceder a esta ruta')
        }
        return true;
    }

}