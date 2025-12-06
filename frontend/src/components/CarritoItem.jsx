export default function CarritoItem({ item, actualizarCantidad, eliminar }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #0002", padding: "1.5rem 1.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <h3 style={{ color: "#2980b9", marginBottom: 8 }}>{item.nombre}</h3>
      <p style={{ color: "#555", marginBottom: 8 }}>Precio unitario: {item.precio} Bs</p>

      <label style={{ fontWeight: 500, color: "#34495e", marginBottom: 8 }}>
        Cantidad:
        <input
          type="number"
          min="1"
          value={item.cantidad}
          onChange={(e) =>
            actualizarCantidad(item.plato_id, Number(e.target.value))
          }
          style={{ width: "60px", marginLeft: "10px", padding: "0.3rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
      </label>

      <p style={{ fontWeight: 600, color: "#27ae60", marginBottom: 12 }}><strong>Subtotal:</strong> {item.subtotal} Bs</p>

      <button
        onClick={() => eliminar(item.plato_id)}
        style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1.2rem", fontWeight: 500, cursor: "pointer", marginTop: "8px" }}
      >
        Eliminar
      </button>
    </div>
  );
}