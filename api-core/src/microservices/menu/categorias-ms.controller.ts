import { Controller, Get, Post, Patch, Delete, Req, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CategoriasMSService } from './categorias-ms.service';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasMSController {
  constructor(private readonly categoriasMS: CategoriasMSService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  getAll(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.getAll(token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  getOne(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.getOne(token, Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Pastas' },
      },
    },
  })
  create(@Req() req, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.create(token, data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Req() req, @Param('id') id: string, @Body() data: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.update(token, Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiParam({ name: 'id', type: 'number' })
  async delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.categoriasMS.delete(token, Number(id));
  }
}
