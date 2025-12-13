import { Controller, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  async obtenerUsuario(@Param('id') id: string) {
    return this.usuariosService.obtenerUsuario(+id);
  }
}
