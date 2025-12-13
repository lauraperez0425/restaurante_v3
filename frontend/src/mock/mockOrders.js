import { useState } from "react";

/* ============================
   CARRITO (SIMULADO)
===============================*/
let carritoGlobal = [];

export function usarCarrito() {
  const [carrito, setCarrito] = useState(carritoGlobal);

  const agregar = (plato) => {
    carritoGlobal.push(plato);
    setCarrito([...carritoGlobal]);
  };

  const limpiarCarrito = () => {
    carritoGlobal = [];
    setCarrito([]);
  };

  return { carrito, agregar, limpiarCarrito };
}

/* ============================
   PEDIDOS (SIMULADOS)
===============================*/
let pedidos = [
  {
    id: 1,
    usuarioId: 1,
    fecha: "2025-01-01",
    total: 58,
    estado: "Pendiente",
    items: [{ id: 5, nombre: "Helado artesanal", precio: 12 }],
    detalles: [{ nombre: "Helado artesanal", cantidad: 1, subtotal: 12 }],
  },
];

/* Crear un pedido */
export async function mockCrearPedido(items) {
  const total = items.reduce((acc, p) => acc + p.precio * (p.cantidad || 1), 0);

  const detalles = items.map(item => ({
    nombre: item.nombre,
    cantidad: item.cantidad || 1,
    subtotal: item.precio
  }));

  const nuevo = {
    id: Date.now(),
    usuarioId: 1, // simulado
    fecha: new Date().toISOString(),
    total,
    estado: "Pendiente",
    items,
    detalles,
  };

  pedidos.push(nuevo);
  return nuevo;
}

/* Listar pedidos del usuario */
export async function mockGetMisPedidos() {
  return pedidos.filter((p) => p.usuarioId === 1);
}

/* Listar pedidos (admin) */
export async function mockGetPedidos() {
  return pedidos;
}

/* Obtener pedido por ID */
export async function mockGetPedidoById(id) {
  return pedidos.find((p) => p.id === Number(id));
}

/* Cambiar estado */
export async function mockActualizarEstadoPedido(id, estado) {
  const pedido = pedidos.find((p) => p.id === Number(id));
  if (pedido) pedido.estado = estado;
  return pedido;
}

/* Cambiar estado del pedido (ADMIN) */
export async function mockUpdateOrderStatus(id, nuevoEstado) {
  const pedido = pedidos.find((p) => p.id === Number(id));
  if (pedido) {
    pedido.estado = nuevoEstado;
  }
  return pedido;
}

/* ============================
   EXPORTS PARA ordersApi.js
===============================*/
export const mockGetMyOrders = mockGetMisPedidos;
export const mockGetAllOrders = mockGetPedidos;
export const mockGetOrderById = mockGetPedidoById;
export const mockCreateOrder = mockCrearPedido;
