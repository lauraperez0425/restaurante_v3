import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException('Token no enviado');
    }

    next();
  }
}
