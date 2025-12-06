import { Controller, Get, Post, Patch, Delete, Req, Body, Param } from '@nestjs/common';
import { ReservasMSService } from './reservas-ms.service';

@Controller('microservices/reservas')
export class ReservasMSController {
  constructor(private readonly reservasMS: ReservasMSService) {}

  @Get()
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.reservasMS.getAll(token);
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.reservasMS.create(token, data);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: number, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.reservasMS.update(token, id, data);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: number) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.reservasMS.delete(token, id);
  }
}
