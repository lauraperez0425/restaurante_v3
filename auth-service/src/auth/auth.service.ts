import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any) {
    const { nombre, apellido, email, password, telefono } = data;

    const existe = await this.usuarioRepo.findOne({ where: { email } });
    if (existe) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevo = this.usuarioRepo.create({
      nombre_usuario: nombre,
      apellido_usuario: apellido,
      email,
      telefono,
      password_hash: hash,
      id_rol: 2, // cliente por defecto
    });

    await this.usuarioRepo.save(nuevo);

    return { ok: true, mensaje: 'Usuario registrado correctamente' };
  }

  async login(email: string, password: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { email } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Payload del token
    const payload = {
      id: usuario.id_usuario,
      nombre: usuario.nombre_usuario,
      rol: usuario.id_rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      ok: true,
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario,
    };
  }
}
