import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        fecha: { type: 'string', example: '2025-12-10' },
        hora: { type: 'string', example: '19:00' },
        personas: { type: 'number', example: 4 },
      },
    },
  })
  create(@Body() body: any) {
    return this.reservaService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.reservaService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
