import { useState } from "react";
import { createReservation } from "../api/reservationsApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CrearReservaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  async function enviar() {
    if (!fecha || !hora) {
      alert("Debe completar fecha y hora");
      return;
    }

    await createReservation(user.id, fecha, hora);
    navigate("/mis-reservas");
  }

  return (
    <div className="page">
      <h1>Crear Reserva</h1>

      <label>
        Fecha:
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </label>

      <label>
        Hora:
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </label>

      <button className="btn-primary" onClick={enviar}>
        Reservar
      </button>
    </div>
  );
}