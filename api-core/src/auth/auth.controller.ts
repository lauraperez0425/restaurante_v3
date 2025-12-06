import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthMSService } from './auth-ms.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authMS: AuthMSService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  login(@Body() data: any) {
    return this.authMS.login(data);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
        nombre: { type: 'string', example: 'Juan' },
        apellido: { type: 'string', example: 'Pérez' },
      },
      required: ['email', 'password', 'nombre', 'apellido'],
    },
  })
  register(@Body() data: any) {
    return this.authMS.register(data);
  }
}
