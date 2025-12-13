import { useEffect, useState } from "react";
import { getMyReservations } from "../../../api/reservationsApi";
import { useAuth } from "../../../context/AuthContext";
import ReservaCard from "../../../components/ReservaCard";

export default function MisReservasPage() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function cargar() {
      const res = await getMyReservations(user.id);
      setReservas(res);
    }
    cargar();
  }, []);

  return (
    <div className="page">
      <h1>Mis Reservas</h1>

      {reservas.length === 0 && <p>No tienes reservas.</p>}

      {reservas.map((r) => (
        <ReservaCard key={r.id || r.id_reserva} reserva={r} />
      ))}
    </div>
  );
}