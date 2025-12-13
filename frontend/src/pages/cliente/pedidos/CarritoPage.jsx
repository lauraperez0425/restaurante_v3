import { useCarrito } from "../../../context/CarritoContext";
import CarritoItem from "../../../components/CarritoItem";
import { Link } from "react-router-dom";

export default function CarritoPage() {
  const { items, actualizarCantidad, eliminarItem, limpiarCarrito } = useCarrito();

  const total = items.reduce((s, i) => s + (parseFloat(i.precio || 0) * i.cantidad), 0);

  if (items.length === 0)
    return (
      <div className="page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f8fa" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #0002", padding: "2.5rem 2rem", maxWidth: 350, width: "100%", textAlign: "center" }}>
          <h1 style={{ color: "#2c3e50" }}>Carrito vacío</h1>
          <Link to="/platos" style={{ color: "#2980b9", fontWeight: 500, textDecoration: "none" }}>Volver al menú</Link>
        </div>
      </div>
    );

  return (
    <div className="page" style={{ minHeight: "100vh", background: "#f6f8fa" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>Mi Carrito</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", maxWidth: 900, margin: "0 auto 2rem auto" }}>
        {items.map((item) => (
          <CarritoItem
            key={item.id}
            item={{ ...item, plato_id: item.id, subtotal: item.precio * item.cantidad }}
            actualizarCantidad={(id, cantidad) => actualizarCantidad(id, cantidad)}
            eliminar={(id) => eliminarItem(id)}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "#27ae60", fontWeight: 700 }}>Total: {total.toFixed(2)} Bs</h2>
        <Link className="btn-primary" to="/pedidos/crear" style={{ padding: "0.8rem 2rem", borderRadius: 8, fontWeight: 600, background: "#2980b9", color: "#fff", border: "none", fontSize: "1.1rem", textDecoration: "none", display: "inline-block", marginTop: "1rem" }}>
          Confirmar pedido
        </Link>
      </div>
    </div>
  );
}