import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Se ejecuto el controlador en el metodo ${req.method} 
                en la ruta ${req.url} 
                en la fecha ${new Date()}`)
    next();
    }
}

export function GlobalMidleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Se ejecuto el controlador en el metodo ${req.method} 
    en la ruta ${req.url} 
    en la fecha ${new Date()}`)
    next();
}
