import { Controller, Get, Post, Patch, Delete, Req, Param, Body } from '@nestjs/common';
import { PlatosMSService } from './platos-ms.service';

@Controller('microservices/platos')
export class PlatosMSController {
  constructor(private readonly platosMS: PlatosMSService) {}

  @Get()
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.getAll(token);
  }

  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.getOne(token, Number(id));
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.create(token, data);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.update(token, Number(id), data);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.delete(token, Number(id));
  }
}
