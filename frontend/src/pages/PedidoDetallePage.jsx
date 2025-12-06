import { useEffect, useState } from "react";
import { getOrderById } from "../api/ordersApi";
import { useParams } from "react-router-dom";
import EstadoPedidoBadge from "../components/EstadoPedidoBadge";

export default function PedidoDetallePage() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    async function cargar() {
      const res = await getOrderById(id);
      setPedido(res);
    }
    cargar();
  }, [id]);

  if (!pedido) return <p className="page">Cargando...</p>;

  return (
    <div className="page">
      <h1>Pedido #{pedido.id}</h1>
      <p><strong>Fecha:</strong> {pedido.fecha}</p>
      <p><strong>Estado:</strong> <EstadoPedidoBadge estado={pedido.estado} /></p>

      <h3>Detalles:</h3>
      <ul>
        {pedido.detalles.map((d, idx) => (
          <li key={idx}>
            {d.nombre} — {d.cantidad} x {d.subtotal} Bs
          </li>
        ))}
      </ul>

      <h2>Total: {pedido.total} Bs</h2>
    </div>
  );
}