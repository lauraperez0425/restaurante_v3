import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
