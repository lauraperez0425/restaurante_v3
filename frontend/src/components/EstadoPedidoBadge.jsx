export default function EstadoPedidoBadge({ estado }) {
  const colors = {
    pendiente: "#facc15",
    preparando: "#60a5fa",
    listo: "#4ade80",
    entregado: "#22c55e",
    cancelado: "#ef4444",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: colors[estado] || "#d1d5db",
        color: "black",
        fontWeight: "bold",
        fontSize: "0.8rem",
        textTransform: "capitalize",
      }}
    >
      {estado}
    </span>
  );
}