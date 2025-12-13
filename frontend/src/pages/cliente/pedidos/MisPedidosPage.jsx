import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../../api/ordersApi";
import { useAuth } from "../../../context/AuthContext";
import EstadoPedidoBadge from "../../../components/EstadoPedidoBadge";

export default function MisPedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const res = await getMyOrders(user.id);
        setPedidos(res);
        setError(null);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("No se pudieron cargar los pedidos");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [user]);

  // Organizar pedidos por estado
  const pedidosActivos = pedidos.filter(p => 
    p.estado === 'Pendiente' || p.estado === 'En proceso' || p.estado === 'Listo'
  );
  const pedidosCompletados = pedidos.filter(p => p.estado === 'Entregado');
  const pedidosCancelados = pedidos.filter(p => p.estado === 'Cancelado');

  const renderPedido = (pedido) => {
    const getStatusColor = (estado) => {
      const colors = {
        'Pendiente': '#ffa500',
        'En proceso': '#2196f3',
        'Listo': '#9c27b0',
        'Entregado': '#4caf50',
        'Cancelado': '#f44336'
      };
      return colors[estado] || '#666';
    };

    return (
      <div 
        key={pedido.id} 
        style={{
          border: `2px solid ${getStatusColor(pedido.estado)}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px',
            color: '#333'
          }}>
            Pedido #{pedido.id}
          </h2>
          <EstadoPedidoBadge estado={pedido.estado} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div>
            <p style={{ 
              margin: '5px 0', 
              color: '#666',
              fontSize: '14px'
            }}>
              <strong>📅 Fecha:</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '15px' }}>
              {pedido.fecha}
            </p>
          </div>
          <div>
            <p style={{ 
              margin: '5px 0', 
              color: '#666',
              fontSize: '14px'
            }}>
              <strong>💰 Total:</strong>
            </p>
            <p style={{ 
              margin: '5px 0', 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#4caf50'
            }}>
              {pedido.total} Bs
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px'
        }}>
          <h4 style={{ 
            marginTop: 0, 
            marginBottom: '10px',
            color: '#333'
          }}>
            🍽️ Detalles del pedido:
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            listStyle: 'none'
          }}>
            {pedido.detalles.map((d, idx) => (
              <li key={idx} style={{ 
                padding: '8px 0',
                borderBottom: idx < pedido.detalles.length - 1 ? '1px solid #e0e0e0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontWeight: '500' }}>
                  {d.nombre} <span style={{ color: '#666' }}>x{d.cantidad}</span>
                </span>
                <span style={{ 
                  fontWeight: 'bold',
                  color: '#4caf50'
                }}>
                  {d.subtotal} Bs
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '32px', 
        marginBottom: '30px',
        color: '#333',
        textAlign: 'center'
      }}>
        📦 Mis Pedidos
      </h1>

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Cargando pedidos...</p>
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#ffebee',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '18px', color: '#c62828' }}>{error}</p>
        </div>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <p style={{ 
            fontSize: '18px', 
            color: '#666',
            margin: 0
          }}>
            🛒 No tienes pedidos aún.
          </p>
          <Link 
            to="/platos"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#4caf50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            Ver menú
          </Link>
        </div>
      )}

      {/* Pedidos Activos */}
      {pedidosActivos.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#2196f3',
            borderBottom: '2px solid #2196f3',
            paddingBottom: '10px'
          }}>
            🔔 Pedidos Activos ({pedidosActivos.length})
          </h2>
          {pedidosActivos.map(renderPedido)}
        </div>
      )}

      {/* Pedidos Completados */}
      {pedidosCompletados.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#4caf50',
            borderBottom: '2px solid #4caf50',
            paddingBottom: '10px'
          }}>
            ✅ Pedidos Completados ({pedidosCompletados.length})
          </h2>
          {pedidosCompletados.map(renderPedido)}
        </div>
      )}

      {/* Pedidos Cancelados */}
      {pedidosCancelados.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#f44336',
            borderBottom: '2px solid #f44336',
            paddingBottom: '10px'
          }}>
            ❌ Pedidos Cancelados ({pedidosCancelados.length})
          </h2>
          {pedidosCancelados.map(renderPedido)}
        </div>
      )}
    </div>
  );
}