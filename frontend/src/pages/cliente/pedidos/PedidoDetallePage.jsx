import { useEffect, useState } from "react";
import { getOrderById } from "../../../api/ordersApi";
import { useParams, useNavigate } from "react-router-dom";
import EstadoPedidoBadge from "../../../components/EstadoPedidoBadge";
import { useAuth } from "../../../context/AuthContext";

export default function PedidoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      if (!user) {
        setError("Debes iniciar sesión para ver tus pedidos");
        setLoading(false);
        return;
      }

      // Validar que el ID sea un número válido
      if (!id || isNaN(+id)) {
        setError("ID de pedido inválido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getOrderById(id);
        setPedido(res);
        setError(null);
      } catch (err) {
        console.error("Error al cargar pedido:", err);
        setError(err.response?.data?.message || "No se pudo cargar el pedido");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [id, user]);

  if (loading) {
    return (
      <div className="page" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: '#ffebee',
          padding: '30px',
          borderRadius: '12px',
          marginTop: '50px'
        }}>
          <h2 style={{ color: '#c62828', marginBottom: '20px' }}>⚠️ Error</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>{error}</p>
          <button 
            onClick={() => navigate('/mis-pedidos')}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ← Volver a Mis Pedidos
          </button>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="page" style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Pedido no encontrado</p>
      </div>
    );
  }

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
    <div className="page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/mis-pedidos')}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ← Volver a Mis Pedidos
      </button>

      <div style={{
        border: `3px solid ${getStatusColor(pedido.estado)}`,
        borderRadius: '12px',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
            📦 Pedido #{pedido.id}
          </h1>
          <EstadoPedidoBadge estado={pedido.estado} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>📅 Fecha del pedido</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '16px', color: '#333' }}>
              {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>💰 Total pagado</strong>
            </p>
            <p style={{ 
              margin: '5px 0', 
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#4caf50'
            }}>
              {parseFloat(pedido.total).toFixed(2)} Bs
            </p>
          </div>
        </div>

        {/* Información del cliente */}
        {pedido.usuario && (
          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px',
            border: '2px solid #4caf50'
          }}>
            <h3 style={{ 
              marginTop: 0, 
              marginBottom: '15px', 
              color: '#2e7d32', 
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              👤 Información del Cliente
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>Nombre completo:</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '16px', color: '#333', fontWeight: '600' }}>
                  {pedido.usuario.nombre} {pedido.usuario.apellido}
                </p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>📞 Teléfono de contacto:</strong>
                </p>
                <p style={{ 
                  margin: '5px 0', 
                  fontSize: '16px', 
                  color: '#333',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  🇧🇴 +591 {pedido.usuario.telefono}
                </p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>📧 Correo electrónico:</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '15px', color: '#333' }}>
                  {pedido.usuario.email}
                </p>
              </div>
            </div>
            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#fff',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              💡 <strong>Retiro en local:</strong> Contacta al cliente para coordinar la entrega
            </div>
          </div>
        )}

        <div>
          <h3 style={{ 
            fontSize: '20px', 
            marginBottom: '15px',
            color: '#333',
            borderBottom: '2px solid #e0e0e0',
            paddingBottom: '10px'
          }}>
            🍽️ Detalle del pedido
          </h3>

          {pedido.detalles && pedido.detalles.length > 0 ? (
            <div style={{ marginBottom: '20px' }}>
              {pedido.detalles.map((detalle, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    borderBottom: idx < pedido.detalles.length - 1 ? '1px solid #f0f0f0' : 'none',
                    gap: '15px',
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
                      {detalle.nombre_plato || detalle.nombre}
                    </div>
                    <div style={{ 
                      color: '#999',
                      fontSize: '14px'
                    }}>
                      Cantidad: {detalle.cantidad} × {parseFloat(detalle.precio_unitario || detalle.precio || 0).toFixed(2)} Bs
                    </div>
                  </div>
                  <div style={{ 
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#4caf50'
                  }}>
                    {parseFloat(detalle.subtotal).toFixed(2)} Bs
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              No hay detalles disponibles para este pedido
            </p>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            background: '#f0f7ff',
            borderRadius: '8px',
            marginTop: '20px',
            border: '2px solid #2196f3'
          }}>
            <span style={{ 
              fontSize: '20px',
              fontWeight: '600',
              color: '#333'
            }}>
              Total del pedido:
            </span>
            <span style={{ 
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#4caf50'
            }}>
              {parseFloat(pedido.total).toFixed(2)} Bs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}