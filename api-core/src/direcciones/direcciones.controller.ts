import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Post()
  create(@Body() dto: CreateDireccionDto) {
    return this.direccionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.direccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDireccionDto) {
    return this.direccionesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direccionesService.remove(+id);
  }
}
