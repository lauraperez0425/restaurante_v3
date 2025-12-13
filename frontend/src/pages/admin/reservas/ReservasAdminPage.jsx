import { useEffect, useState } from "react";
import {
  getAllReservations,
} from "../../../api/reservationsApi";
import { useNotifications } from "../../../context/NotificationsContext";
import { useLocation, Link } from "react-router-dom";

export default function ReservasAdminPage() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const { checkNotifications } = useNotifications();
  const location = useLocation();

  useEffect(() => {
    console.log('🔄 ReservasAdminPage - useEffect disparado. location.key:', location.key);
    console.log('📍 location.state:', location.state);
    async function cargar() {
      try {
        console.log('📡 Solicitando todas las reservas...');
        setLoading(true);
        const data = await getAllReservations();
        console.log('✅ Reservas recibidas:', data.length, 'reservas');
        console.log('📋 Datos completos:', data);
        console.log('📋 Primera reserva:', data[0]);
        
        setReservas(data);
        setError(null);
        
        // Actualizar notificaciones después de cargar
        checkNotifications();
      } catch (err) {
        console.error("❌ Error al cargar reservas:", err);
        setError("No se pudieron cargar las reservas");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [location.key, location.state]);

  // Debug: ver estados de las reservas
  useEffect(() => {
    if (reservas.length > 0) {
      console.log('📊 Estados de reservas:', reservas.map(r => ({ id: r.id_reserva, estado: r.estado })));
    }
  }, [reservas]);

  const reservasFiltradas = filtroEstado === "todos" 
    ? reservas 
    : reservas.filter(r => r.estado?.toLowerCase() === filtroEstado.toLowerCase());

  // Organizar reservas por estado (case-insensitive)
  const reservasPendientes = reservasFiltradas.filter(r => r.estado?.toLowerCase() === 'pendiente');
  const reservasConfirmadas = reservasFiltradas.filter(r => r.estado?.toLowerCase() === 'confirmada');
  const reservasCanceladas = reservasFiltradas.filter(r => r.estado?.toLowerCase() === 'cancelada');

  const getStatusColor = (estado) => {
    const estadoLower = estado?.toLowerCase();
    const colors = {
      'pendiente': '#ffa500',
      'confirmada': '#4caf50',
      'cancelada': '#f44336'
    };
    return colors[estadoLower] || '#666';
  };

  const getStatusEmoji = (estado) => {
    const estadoLower = estado?.toLowerCase();
    const emojis = {
      'pendiente': '⏳',
      'confirmada': '✅',
      'cancelada': '❌'
    };
    return emojis[estadoLower] || '📋';
  };

  const renderReserva = (reserva) => {
    // Determinar el ID de la reserva (puede ser id_reserva o id)
    const reservaId = reserva.id_reserva || reserva.id;
    
    return (
      <div 
        key={reservaId} 
        style={{
          border: `2px solid ${getStatusColor(reserva.estado)}`,
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
            Reserva #{reservaId}
          </h3>
          <span style={{
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: getStatusColor(reserva.estado),
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {getStatusEmoji(reserva.estado)} {reserva.estado}
          </span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>📅 Fecha:</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: '600' }}>
              {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              <strong>🕐 Hora:</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: '600' }}>
              {reserva.hora}
            </p>
          </div>
          {reserva.numero_personas && (
            <div>
              <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                <strong>👥 Personas:</strong>
              </p>
              <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: '600' }}>
                {reserva.numero_personas} {reserva.numero_personas === 1 ? 'persona' : 'personas'}
              </p>
            </div>
          )}
          {reserva.creado_en && (
            <div>
              <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                <strong>📝 Creada:</strong>
              </p>
              <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: '600' }}>
                {new Date(reserva.creado_en).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Información del cliente */}
        {reserva.usuario && (
          <div style={{
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '1px solid #2196f3'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#1976d2', fontSize: '16px' }}>
              👤 Información del Cliente
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
                  {reserva.usuario.nombre} {reserva.usuario.apellido}
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
                  🇧🇴 +591 {reserva.usuario.telefono}
                </p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>
                  <strong>📧 Email:</strong>
                </p>
                <p style={{ margin: '5px 0', fontSize: '15px', color: '#333' }}>
                  {reserva.usuario.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notas especiales */}
        {reserva.notas && (
          <div style={{
            backgroundColor: '#fff9e6',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '1px solid #ffc107'
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#f57c00', fontSize: '16px' }}>
              📝 Notas especiales
            </h4>
            <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>
              {reserva.notas}
            </p>
          </div>
        )}

        {/* Botón de acción */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to={`/reservas/${reservaId}`}
            style={{ 
              padding: '12px 24px',
              backgroundColor: '#2196f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.2s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196f3'}
          >
            Ver detalle y cambiar estado
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
        📅 Gestión de Reservas (Admin)
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
        {['todos', 'Pendiente', 'Confirmada', 'Cancelada'].map(estado => (
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
          <p style={{ fontSize: '18px', color: '#666' }}>Cargando reservas...</p>
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

      {!loading && !error && reservas.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            No hay reservas registradas
          </p>
        </div>
      )}

      {/* Debug info */}
      {!loading && !error && reservas.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px', fontSize: '14px' }}>
          <strong>Debug:</strong> Total: {reservas.length} | Filtradas: {reservasFiltradas.length} | 
          Pendientes: {reservasPendientes.length} | Confirmadas: {reservasConfirmadas.length} | Canceladas: {reservasCanceladas.length}
        </div>
      )}

      {/* Todas las reservas - Vista simple */}
      {!loading && !error && reservasFiltradas.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            color: '#2196f3',
            borderBottom: '2px solid #2196f3',
            paddingBottom: '10px'
          }}>
            📋 {filtroEstado === 'todos' ? 'Todas las Reservas' : `Reservas ${filtroEstado}s`} ({reservasFiltradas.length})
          </h2>
          {reservasFiltradas.map(renderReserva)}
        </div>
      )}

      {!loading && !error && reservas.length > 0 && reservasFiltradas.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            No hay reservas con el estado "{filtroEstado}"
          </p>
        </div>
      )}
    </div>
  );
}