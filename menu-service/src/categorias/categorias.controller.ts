import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  // -------------------------------------------------------
  // RUTAS PÚBLICAS (clientes y admin Pueden ver)
  // -------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  // -------------------------------------------------------
  // RUTAS SOLO ADMINISTRADOR
  // -------------------------------------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
