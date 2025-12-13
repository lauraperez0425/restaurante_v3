import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../api/ordersApi";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";
import { showToast } from "../../../components/Toast";

export default function CrearPedidoPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, limpiarCarrito } = useCarrito();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + (parseFloat(item.precio || 0) * item.cantidad), 0);

  const confirmarPedido = async () => {
    if (items.length === 0) {
      showToast("El carrito está vacío", "error");
      return;
    }

    if (!user || !user.id) {
      showToast("Debes iniciar sesión para crear un pedido", "error");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      // Convertir items al formato que espera el backend
      const carritoBackend = items.map(item => ({
        plato_id: item.id,
        nombre: item.nombre,
        precio: parseFloat(item.precio),
        cantidad: item.cantidad,
        subtotal: parseFloat(item.precio) * item.cantidad
      }));
      
      await createOrder(user.id, carritoBackend);
      limpiarCarrito();
      showToast("¡Pedido creado con éxito!");
      navigate("/mis-pedidos");
    } catch (error) {
      console.error("Error al crear pedido:", error);
      showToast("Error al crear el pedido. Por favor intenta de nuevo.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="page" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#666', marginBottom: '20px' }}>🛒 Carrito vacío</h2>
          <p style={{ color: '#999', marginBottom: '20px' }}>Agrega platos antes de crear un pedido.</p>
          <button 
            onClick={() => navigate('/platos')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Ver menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '32px',
        marginBottom: '30px',
        color: '#333'
      }}>
        ✅ Confirmar Pedido
      </h1>

      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          marginTop: 0,
          marginBottom: '20px',
          color: '#666',
          fontSize: '18px',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          📋 Resumen del pedido
        </h3>

        <div style={{ marginBottom: '20px' }}>
          {items.map((p) => (
            <div 
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                borderBottom: '1px solid #f0f0f0',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ 
                  fontWeight: '600',
                  fontSize: '16px',
                  color: '#333',
                  marginBottom: '5px'
                }}>
                  {p.nombre}
                </div>
                <div style={{ 
                  color: '#999',
                  fontSize: '14px'
                }}>
                  {p.cantidad} x {parseFloat(p.precio).toFixed(2)} Bs
                </div>
              </div>
              <div style={{ 
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#4caf50'
              }}>
                {(parseFloat(p.precio) * p.cantidad).toFixed(2)} Bs
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 15px',
          background: '#f9f9f9',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <span style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: '#333'
          }}>
            Total:
          </span>
          <span style={{ 
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#4caf50'
          }}>
            {total.toFixed(2)} Bs
          </span>
        </div>
      </div>

      <div style={{ 
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => navigate('/carrito')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#757575'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9e9e9e'}
        >
          ← Volver al carrito
        </button>
        
        <button 
          onClick={confirmarPedido}
          disabled={loading}
          style={{
            padding: '15px 40px',
            backgroundColor: loading ? '#cccccc' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)'
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#4caf50')}
        >
          {loading ? '⏳ Procesando...' : '✓ Confirmar pedido'}
        </button>
      </div>
    </div>
  );
}