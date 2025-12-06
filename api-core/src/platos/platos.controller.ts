import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  create(@Body() dto: CreatePlatoDto) {
    return this.platosService.create(dto);
  }

  @Get()
  findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.platosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlatoDto) {
    return this.platosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.platosService.remove(id);
  }
}
