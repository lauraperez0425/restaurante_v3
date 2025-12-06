import { Controller, Get, Post, Patch, Delete, Req, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { PlatosMSService } from './platos-ms.service';

@ApiTags('Platos')
@Controller('platos')
export class PlatosMSController {
  constructor(private readonly platosMS: PlatosMSService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los platos' })
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.getAll(token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  getOne(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.getOne(token, Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plato' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Pizza Margarita' },
        descripcion: { type: 'string', example: 'Pizza con tomate y queso' },
        precio: { type: 'number', example: 12.99 },
        categoriaId: { type: 'number', example: 1 },
      },
    },
  })
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.create(token, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plato' })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Req() req, @Param('id') id: string, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.update(token, Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plato' })
  @ApiParam({ name: 'id', type: 'number' })
  delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.platosMS.delete(token, Number(id));
  }
}
