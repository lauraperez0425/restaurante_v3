import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CategoriasMSController } from './categorias-ms.controller';
import { CategoriasMSService } from './categorias-ms.service';

import { PlatosMSController } from './platos-ms.controller';
import { PlatosMSService } from './platos-ms.service';

@Module({
  imports: [HttpModule],
  controllers: [
    CategoriasMSController,
    PlatosMSController,
  ],
  providers: [
    CategoriasMSService,
    PlatosMSService,
  ],
})
export class MenuMSModule {}
