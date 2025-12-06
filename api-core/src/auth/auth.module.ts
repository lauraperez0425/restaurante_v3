import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthMSService } from './auth-ms.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthMSService],
})
export class AuthModule {}
