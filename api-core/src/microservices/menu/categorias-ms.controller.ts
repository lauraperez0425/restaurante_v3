import { Controller, Get, Post, Patch, Delete, Req, Param, Body } from '@nestjs/common';
import { CategoriasMSService } from './categorias-ms.service';

@Controller('microservices/categorias')
export class CategoriasMSController {
  constructor(private readonly categoriasMS: CategoriasMSService) {}

  @Get()
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.getAll(token);
  }

  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.getOne(token, Number(id));
  }

  @Post()
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.create(token, data);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.update(token, Number(id), data);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.delete(token, Number(id));
  }
}
