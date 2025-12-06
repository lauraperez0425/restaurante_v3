import EstadoPedidoBadge from "./EstadoPedidoBadge";
import { Link } from "react-router-dom";

export default function PedidoCard({ pedido, isAdmin }) {
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <h2>Pedido #{pedido.id}</h2>
      <p><strong>Fecha:</strong> {pedido.fecha}</p>
      <p><strong>Total:</strong> {pedido.total} Bs</p>
      <p><strong>Estado:</strong> <EstadoPedidoBadge estado={pedido.estado} /></p>

      <h4>Detalles:</h4>
      <ul>
        {pedido.detalles.map((d, idx) => (
          <li key={idx}>
            {d.nombre} — {d.cantidad} x {d.subtotal} Bs
          </li>
        ))}
      </ul>

      <Link
        to={`/pedidos/${pedido.id}`}
        style={{ display: "inline-block", marginTop: "10px" }}
      >
        Ver detalle
      </Link>

      {isAdmin && (
        <Link
          to={`/pedidos/admin/${pedido.id}`}
          style={{
            display: "inline-block",
            marginTop: "10px",
            marginLeft: "10px",
            color: "red",
          }}
        >
          Cambiar estado
        </Link>
      )}
    </div>
  );
}