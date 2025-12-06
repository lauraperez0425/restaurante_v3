import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../api/ordersApi";
import EstadoPedidoBadge from "../components/EstadoPedidoBadge";

export default function CambiarEstadoPedidoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");

  useEffect(() => {
    async function cargar() {
      const res = await getOrderById(id);
      setPedido(res);
      setNuevoEstado(res.estado);
    }
    cargar();
  }, [id]);

  async function guardar(e) {
    e.preventDefault();
    await updateOrderStatus(id, nuevoEstado);
    alert("Estado actualizado");
    navigate("/pedidos");
  }

  if (!pedido) return <p className="page">Cargando...</p>;

  return (
    <div className="page" style={{ maxWidth: 500, margin: "2rem auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0002", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2c3e50" }}>
        Cambiar Estado del Pedido <span style={{ color: "#2980b9" }}>#{pedido.id}</span>
      </h1>

      <div style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
        <p><strong>Fecha:</strong> {pedido.fecha}</p>
        <p><strong>Total:</strong> <span style={{ color: "#27ae60" }}>{pedido.total} Bs</span></p>
        <p><strong>Estado actual:</strong> <EstadoPedidoBadge estado={pedido.estado} /></p>
      </div>

      <h3 style={{ marginBottom: "0.5rem", color: "#34495e" }}>Detalles:</h3>
      <ul style={{ marginBottom: "1.5rem", paddingLeft: 20 }}>
        {pedido.detalles.map((d, idx) => (
          <li key={idx} style={{ marginBottom: 6 }}>
            <span style={{ fontWeight: 500 }}>{d.nombre}</span> — <span style={{ color: "#7f8c8d" }}>{d.cantidad} x {d.subtotal} Bs</span>
          </li>
        ))}
      </ul>

      <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ fontWeight: 500, color: "#2c3e50" }}>
          Nuevo estado:
          <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} style={{ marginLeft: 10, padding: "0.4rem", borderRadius: 6, border: "1px solid #ccc" }}>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="en_preparacion">En Preparación</option>
            <option value="listo">Listo</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </label>

        <button className="btn-primary" style={{ padding: "0.7rem 1.2rem", borderRadius: 8, fontWeight: 600, background: "#2980b9", color: "#fff", border: "none", cursor: "pointer" }}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
