import { useEffect, useState } from "react";
import { mockGetMyOrders } from "../mock/mockOrders";
import { useAuth } from "../context/AuthContext";
import PedidoCard from "../components/PedidoCard";

export default function MisPedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const res = await mockGetMyOrders();
      setPedidos(res);
    }
    cargar();
  }, []);

  return (
    <div className="page">
      <h1>Mis Pedidos</h1>

      {pedidos.length === 0 && <p>No tienes pedidos aún.</p>}

      {pedidos.map((p) => (
        <PedidoCard key={p.id} pedido={p} />
      ))}
    </div>
  );
}