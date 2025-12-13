import { useEffect, useState } from "react";
import { getAllOrders } from "../../../api/ordersApi";
import { useNotifications } from "../../../context/NotificationsContext";
import EstadoPedidoBadge from "../../../components/EstadoPedidoBadge";
import { Link, useLocation } from "react-router-dom";

export default function PedidosAdminPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const { checkNotifications } = useNotifications();
  const location = useLocation();

  useEffect(() => {
    console.log('🔄 PedidosAdminPage - useEffect disparado. location.key:', location.key);
    console.log('📍 location.state:', location.state);
    async function cargar() {
      try {
        console.log('📡 Solicitando todos los pedidos...');
        setLoading(true);
        const data = await getAllOrders();
        console.log('✅ Pedidos recibidos:', data.length, 'pedidos');
        console.log('📋 Datos completos:', data);
        
        // Filtrar pedidos que tengan un ID válido
        const pedidosValidos = data.filter(p => p && p.id && !isNaN(+p.id));
        console.log('✅ Pedidos válidos:', pedidosValidos.length);
        
        setPedidos(pedidosValidos);
        setError(null);
        
        // Actualizar notificaciones después de cargar
        checkNotifications();
      } catch (err) {
        console.error("❌ Error al cargar pedidos:", err);
        setError("No se pudieron cargar los pedidos");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [location.key, location.state]); // Recargar cuando cambie la ruta o el state

  const pedidosFiltrados = filtroEstado === "todos" 
    ? pedidos 
    : pedidos.filter(p => p.estado === filtroEstado);

  // Organizar pedidos por estado
  const pedidosPendientes = pedidosFiltrados.filter(p => p.estado === 'Pendiente');
  const pedidosEnProceso = pedidosFiltrados.filter(p => p.estado === 'En proceso');
  const pedidosListos = pedidosFiltrados.filter(p => p.estado === 'Listo');
  const pedidosEntregados = pedidosFiltrados.filter(p => p.estado === 'Entregado');
  const pedidosCancelados = pedidosFiltrados.filter(p => p.estado === 'Cancelado');

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

  const renderPedido = (pedido) => {
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
          <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>
            Pedido #{pedido.id}
          </h3>
          <EstadoPedidoBadge estado={pedido.estado} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>📅 Fecha:</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '15px' }}>
              {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>💰 Total:</strong>
            </p>
            <p style={{ 
              margin: '5px 0', 
              fontSize: '18px',
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
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '1px solid #2196f3'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#1976d2', fontSize: '16px' }}>
              👤 Información del Cliente (Retiro en Local)
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px'
            }}>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>Nombre:</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '15px', color: '#333' }}>
                  {pedido.usuario.nombre} {pedido.usuario.apellido}
                </p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>📞 Teléfono:</strong>
                </p>
                <p style={{ 
                  margin: '5px 0', 
                  fontSize: '15px', 
                  color: '#333',
                  fontWeight: '600'
                }}>
                  🇧🇴 +591 {pedido.usuario.telefono}
                </p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>📧 Email:</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '15px', color: '#333' }}>
                  {pedido.usuario.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {pedido.detalles && pedido.detalles.length > 0 && (
          <div style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#333', fontSize: '16px' }}>
              🍽️ Detalles:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
              {pedido.detalles.map((d, idx) => (
                <li key={idx} style={{ 
                  padding: '8px 0',
                  borderBottom: idx < pedido.detalles.length - 1 ? '1px solid #e0e0e0' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>
                    <strong>{d.nombre_plato || d.nombre}</strong>
                    <span style={{ color: '#666' }}> x{d.cantidad}</span>
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {parseFloat(d.subtotal).toFixed(2)} Bs
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to={`/pedidos/${pedido.id}`}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196f3'}
          >
            📋 Ver detalle
          </Link>
          
          <Link
            to={`/pedidos/admin/${pedido.id}`}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#ff9800',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f57c00'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff9800'}
          >
            ✏️ Cambiar estado
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="page" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '32px', 
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
      }}>
        📦 Gestión de Pedidos (Admin)
      </h1>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px'
      }}>
        {['todos', 'Pendiente', 'En proceso', 'Listo', 'Entregado', 'Cancelado'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            style={{
              padding: '10px 20px',
              backgroundColor: filtroEstado === estado ? '#2196f3' : '#fff',
              color: filtroEstado === estado ? '#fff' : '#333',
              border: '2px solid #2196f3',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            {estado === 'todos' ? '📊 Todos' : estado}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Cargando pedidos...</p>
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#ffebee',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '18px', color: '#c62828' }}>{error}</p>
        </div>
      )}

      {!loading && !error && pedidosFiltrados.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            No hay pedidos {filtroEstado !== 'todos' ? `con estado "${filtroEstado}"` : ''}
          </p>
        </div>
      )}

      {/* Pedidos Pendientes */}
      {pedidosPendientes.length > 0 && filtroEstado === 'todos' && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#ffa500',
            borderBottom: '2px solid #ffa500',
            paddingBottom: '10px'
          }}>
            ⏳ Pendientes ({pedidosPendientes.length})
          </h2>
          {pedidosPendientes.map(renderPedido)}
        </div>
      )}

      {/* Pedidos En Proceso */}
      {pedidosEnProceso.length > 0 && filtroEstado === 'todos' && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#2196f3',
            borderBottom: '2px solid #2196f3',
            paddingBottom: '10px'
          }}>
            🔄 En Proceso ({pedidosEnProceso.length})
          </h2>
          {pedidosEnProceso.map(renderPedido)}
        </div>
      )}

      {/* Pedidos Listos */}
      {pedidosListos.length > 0 && filtroEstado === 'todos' && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#9c27b0',
            borderBottom: '2px solid #9c27b0',
            paddingBottom: '10px'
          }}>
            ✨ Listos para entregar ({pedidosListos.length})
          </h2>
          {pedidosListos.map(renderPedido)}
        </div>
      )}

      {/* Pedidos Entregados */}
      {pedidosEntregados.length > 0 && filtroEstado === 'todos' && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#4caf50',
            borderBottom: '2px solid #4caf50',
            paddingBottom: '10px'
          }}>
            ✅ Entregados ({pedidosEntregados.length})
          </h2>
          {pedidosEntregados.map(renderPedido)}
        </div>
      )}

      {/* Pedidos Cancelados */}
      {pedidosCancelados.length > 0 && filtroEstado === 'todos' && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#f44336',
            borderBottom: '2px solid #f44336',
            paddingBottom: '10px'
          }}>
            ❌ Cancelados ({pedidosCancelados.length})
          </h2>
          {pedidosCancelados.map(renderPedido)}
        </div>
      )}

      {/* Si hay un filtro activo, mostrar todos los filtrados */}
      {filtroEstado !== 'todos' && pedidosFiltrados.map(renderPedido)}
    </div>
  );
}