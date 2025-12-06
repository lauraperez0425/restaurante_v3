import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@ApiTags('Platos')
@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plato' })
  create(@Body() dto: CreatePlatoDto) {
    return this.platosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los platos' })
  findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.platosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plato' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlatoDto) {
    return this.platosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plato' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.platosService.remove(id);
  }
}
