import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255) // mínimo 6 caracteres para el password hash
  password_hash: string;

  @IsOptional()
  @IsString()
  @Length(7, 20)
  telefono?: string;

  @IsNumber()
  id_rol: number;
}
