import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max, Length } from 'class-validator';

export class CreatePlatoDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  @Length(0, 500, { message: 'La descripción no puede exceder 500 caracteres' })
  descripcion?: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  @Max(10000, { message: 'El precio no puede exceder 10000 Bs' })
  precio: number;

  @IsNumber({}, { message: 'La categoría debe ser un número' })
  @Min(1, { message: 'Debe seleccionar una categoría válida' })
  categoria_id: number;

  @IsOptional()
  @IsBoolean({ message: 'Disponible debe ser verdadero o falso' })
  disponible?: boolean;
}
