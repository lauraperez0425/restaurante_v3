import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';

@Controller('reservas') // 👈 plural para que coincida con /reservas en Postman
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // GET http://localhost:3000/reservas
  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  // GET http://localhost:3000/reservas/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  // POST http://localhost:3000/reservas
  @Post()
  create(@Body() body: any) {
    return this.reservaService.create(body);
  }

  // PATCH http://localhost:3000/reservas/1
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.reservaService.update(+id, body);
  }

  // DELETE http://localhost:3000/reservas/1
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
