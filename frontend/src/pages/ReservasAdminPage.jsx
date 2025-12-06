import { useEffect, useState } from "react";
import {
  getAllReservations,
  updateReservationStatus,
} from "../api/reservationsApi";
import ReservaCard from "../components/ReservaCard";

export default function ReservasAdminPage() {
  const [reservas, setReservas] = useState([]);

  async function cargar() {
    const data = await getAllReservations();
    setReservas(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function cambiarEstado(id, nuevo) {
    await updateReservationStatus(id, nuevo);
    cargar(); // refresca lista
  }

  return (
    <div className="page">
      <h1>Reservas (Admin)</h1>

      {reservas.map((r) => (
        <ReservaCard
          key={r.id_reserva}
          reserva={r}
          isAdmin
          onChangeEstado={(nuevoEstado) =>
            cambiarEstado(r.id_reserva, nuevoEstado)
          }
        />
      ))}
    </div>
  );
}