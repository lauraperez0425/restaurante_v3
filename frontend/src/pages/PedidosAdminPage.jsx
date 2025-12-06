import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/ordersApi";
import EstadoPedidoBadge from "../components/EstadoPedidoBadge";
import PedidoCard from "../components/PedidoCard";

export default function PedidosAdminPage() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await getAllOrders();
      setPedidos(data);
    }
    cargar();
  }, []);

  return (
    <div className="page">
      <h1>Pedidos (Admin)</h1>

      {pedidos.map((p) => (
        <div key={p.id}>
          <PedidoCard pedido={p} isAdmin />
        </div>
      ))}
    </div>
  );
}