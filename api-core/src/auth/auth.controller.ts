import { Controller, Post, Body } from '@nestjs/common';
import { AuthMSService } from './auth-ms.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authMS: AuthMSService) {}

  @Post('login')
  login(@Body() data: any) {
    return this.authMS.login(data);
  }

  @Post('register')
  register(@Body() data: any) {
    return this.authMS.register(data);
  }
}
