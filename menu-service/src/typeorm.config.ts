import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Plato } from './platos/entities/plato.entity';
import { Categoria } from './categorias/entities/categoria.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'menu_db',
  entities: [Plato, Categoria],
  synchronize: true,
};
