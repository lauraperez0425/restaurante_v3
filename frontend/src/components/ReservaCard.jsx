import EstadoPedidoBadge from "./EstadoPedidoBadge";

export default function ReservaCard({ reserva, isAdmin, onChangeEstado }) {
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <h2>Reserva #{reserva.id_reserva}</h2>

      <p><strong>Fecha:</strong> {reserva.fecha}</p>
      <p><strong>Hora:</strong> {reserva.hora}</p>

      <p>
        <strong>Estado:</strong>{" "}
        <EstadoPedidoBadge estado={reserva.estado} />
      </p>

      {isAdmin && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => onChangeEstado("confirmada")}>
            Confirmar
          </button>
          <button
            onClick={() => onChangeEstado("cancelada")}
            style={{ marginLeft: "10px", backgroundColor: "#ef4444" }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}