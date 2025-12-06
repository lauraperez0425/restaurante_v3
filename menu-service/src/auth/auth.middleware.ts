import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Token no enviado');
    }
    next();
  }
}
