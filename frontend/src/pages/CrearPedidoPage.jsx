import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCrearPedido } from "../mock/mockOrders";

export default function CrearPedidoPage() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      setCarrito(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const t = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(t);
  }, [carrito]);

  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    await mockCrearPedido(carrito);

    localStorage.removeItem("carrito");
    alert("¡Pedido creado con éxito!");
    navigate("/mis-pedidos");
  };

  if (carrito.length === 0) {
    return (
      <div className="page">
        <h2>Carrito vacío</h2>
        <p>Agrega platos antes de crear un pedido.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Confirmar pedido</h1>

      <ul>
        {carrito.map((p) => (
          <li key={p.plato_id}>
            {p.nombre} — {p.cantidad} x Bs {p.precio} = Bs {p.subtotal}
          </li>
        ))}
      </ul>

      <h2>Total: Bs {total.toFixed(2)}</h2>

      <button onClick={confirmarPedido} className="btn-primary">
        Confirmar pedido
      </button>
    </div>
  );
}