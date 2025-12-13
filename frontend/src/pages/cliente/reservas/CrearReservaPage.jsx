import { useState } from "react";
import { createReservation } from "../../../api/reservationsApi";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CrearReservaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener la fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  async function enviar(e) {
    e.preventDefault();
    setError("");
    
    if (!fecha || !hora) {
      setError("Debe completar fecha y hora");
      return;
    }

    // Validar que la fecha no sea anterior a hoy
    if (fecha < today) {
      setError("La fecha no puede ser anterior a hoy");
      return;
    }

    try {
      setLoading(true);
      // Ajustar la fecha para evitar problemas de zona horaria
      const fechaAjustada = new Date(fecha + 'T12:00:00').toISOString().split('T')[0];
      await createReservation(user.id, fechaAjustada, hora);
      navigate("/mis-reservas");
    } catch (err) {
      setError("Error al crear la reserva. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      position: "fixed",
      top: "60px",
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #89CFF0 0%, #b3e6f7 50%, #E0F4FF 100%)",
      overflow: "auto",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(26, 53, 87, 0.15)",
        padding: "2.5rem",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          color: "#1a3557", 
          marginBottom: "2rem",
          fontSize: "2rem"
        }}>
          Crear Reserva
        </h1>

        <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ 
              display: "block",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "0.5rem",
              fontSize: "1rem"
            }}>
              📅 Fecha:
            </label>
            <input
              type="date"
              value={fecha}
              min={today}
              onChange={(e) => setFecha(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #e2e8f0",
                fontSize: "1rem",
                transition: "border-color 0.2s",
                cursor: "pointer"
              }}
              onFocus={(e) => e.target.style.borderColor = "#2980b9"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          <div>
            <label style={{ 
              display: "block",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "0.5rem",
              fontSize: "1rem"
            }}>
              🕐 Hora:
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #e2e8f0",
                fontSize: "1rem",
                transition: "border-color 0.2s",
                cursor: "pointer"
              }}
              onFocus={(e) => e.target.style.borderColor = "#2980b9"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <small style={{ 
              display: "block", 
              color: "#64748b", 
              marginTop: "0.5rem",
              fontSize: "0.875rem"
            }}>
              Selecciona la hora deseada para tu reserva
            </small>
          </div>

          {error && (
            <div style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "0.75rem",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "600",
              background: loading ? "#94a3b8" : "#2980b9",
              color: "#fff",
              border: "none",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "0.5rem",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = "#1a5f8a")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "#2980b9")}
          >
            {loading ? "Reservando..." : "🎉 Reservar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/mis-reservas")}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              fontWeight: "500",
              background: "transparent",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#cbd5e1";
              e.target.style.background = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.background = "transparent";
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}