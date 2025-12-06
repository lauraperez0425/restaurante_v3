import { IsInt, IsOptional, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @Min(1)
  id_cliente: number;

  @IsOptional()
  @IsInt()
  id_direccion?: number;

  @IsInt()
  @Min(1)
  id_tipo_pedido: number;

  @IsInt()
  @Min(1)
  id_estado: number;
}
