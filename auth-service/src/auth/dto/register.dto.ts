import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'Juan',
    description: 'Nombre del usuario'
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre: string;

  @ApiProperty({ 
    example: 'Pérez',
    description: 'Apellido del usuario'
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres' })
  apellido: string;

  @ApiProperty({ 
    example: 'juan.perez@email.com',
    description: 'Email del usuario'
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({ 
    example: 'Password123!',
    description: 'Contraseña (mínimo 6 caracteres)'
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(100, { message: 'La contraseña no puede tener más de 100 caracteres' })
  password: string;

  @ApiProperty({ 
    example: '71234567',
    description: 'Teléfono del usuario (8 dígitos)'
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  @Matches(/^[0-9]{8}$/, { 
    message: 'El teléfono debe tener exactamente 8 dígitos numéricos' 
  })
  telefono: string;
}
