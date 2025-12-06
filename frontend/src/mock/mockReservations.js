// -------------------------------
// DATOS DE PRUEBA
// -------------------------------

// Estados permitidos
export const ESTADOS_RESERVA = [
  "pendiente",
  "confirmada",
  "cancelada",
];

// Simulación de reservas existentes
let reservas = [
  {
    id_reserva: 1,
    usuario_id: 2,
    fecha: "2025-01-05",
    hora: "19:00",
    estado: "pendiente",
  },
  {
    id_reserva: 2,
    usuario_id: 2,
    fecha: "2025-01-10",
    hora: "20:00",
    estado: "confirmada",
  },
];

// -------------------------------
// FUNCIONES MOCK
// -------------------------------

// Obtener TODAS las reservas (admin)
export async function mockGetAllReservations() {
  return reservas;
}

// Obtener reservas del usuario
export async function mockGetMyReservations(userId) {
  return reservas.filter((r) => r.usuario_id === Number(userId));
}

// Crear reserva
export async function mockCreateReservation(userId, fecha, hora) {
  const nueva = {
    id_reserva: Date.now(),
    usuario_id: userId,
    fecha,
    hora,
    estado: "pendiente",
  };

  reservas.push(nueva);
  return nueva;
}

// Cambiar estado (admin)
export async function mockUpdateReservationStatus(id, newStatus) {
  const reserva = reservas.find((r) => r.id_reserva === Number(id));
  if (!reserva) throw new Error("Reserva no encontrada");

  reserva.estado = newStatus;
  return reserva;
}