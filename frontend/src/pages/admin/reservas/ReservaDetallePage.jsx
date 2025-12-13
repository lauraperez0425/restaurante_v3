import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReservationById, updateReservationStatus } from "../../../api/reservationsApi";

export default function ReservaDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔄 ReservaDetallePage - Cargando reserva con ID:', id);
    async function cargar() {
      try {
        setLoading(true);
        console.log('📡 Solicitando reserva...');
        const res = await getReservationById(id);
        console.log('✅ Reserva recibida:', res);
        setReserva(res);
        setNuevoEstado(res.estado);
        setError(null);
      } catch (err) {
        console.error("❌ Error al cargar reserva:", err);
        setError("No se pudo cargar la reserva");
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [id]);

  async function guardarEstado(e) {
    e.preventDefault();
    console.log('🔄 Actualizando estado de reserva...');
    console.log('📝 ID:', id);
    console.log('📝 Nuevo estado:', nuevoEstado);
    
    try {
      console.log('📡 Enviando actualización...');
      await updateReservationStatus(id, nuevoEstado);
      console.log('✅ Estado actualizado');
      
      alert("✅ Estado actualizado correctamente");
      navigate("/reservas", { replace: true, state: { reload: Date.now() } });
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      alert("❌ Error al actualizar el estado");
    }
  }

  const getStatusColor = (estado) => {
    const estadoLower = estado?.toLowerCase();
    const colors = {
      'pendiente': '#ffa500',
      'confirmada': '#4caf50',
      'cancelada': '#f44336'
    };
    return colors[estadoLower] || '#666';
  };

  if (loading) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '50px' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Cargando reserva...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{
          background: '#ffebee',
          padding: '30px',
          borderRadius: '12px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '18px', color: '#c62828', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => navigate("/reservas")}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ← Volver a Reservas
          </button>
        </div>
      </div>
    );
  }

  const reservaId = reserva.id_reserva || reserva.id;

  return (
    <div className="page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate("/reservas")}
          style={{
            padding: '10px 20px',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#616161'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#757575'}
        >
          ← Volver a Reservas
        </button>
      </div>

      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>
        📅 Detalle de Reserva #{reservaId}
      </h1>

      <div style={{
        border: `3px solid ${getStatusColor(reserva.estado)}`,
        borderRadius: '12px',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        {/* Estado actual */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            padding: '12px 24px',
            borderRadius: '25px',
            backgroundColor: getStatusColor(reserva.estado),
            color: 'white',
            fontWeight: '700',
            fontSize: '18px'
          }}>
            {reserva.estado}
          </span>
        </div>

        {/* Información de la reserva */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: '600' }}>
              📅 FECHA DE LA RESERVA
            </p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: '600' }}>
              🕐 HORA
            </p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              {reserva.hora}
            </p>
          </div>

          {reserva.numero_personas && (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: '600' }}>
                👥 PERSONAS
              </p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                {reserva.numero_personas} {reserva.numero_personas === 1 ? 'persona' : 'personas'}
              </p>
            </div>
          )}

          {reserva.creado_en && (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: '600' }}>
                📝 CREADA EL
              </p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
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
            borderRadius: '12px',
            padding: '25px',
            marginBottom: '30px',
            border: '2px solid #2196f3'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1976d2', fontSize: '20px' }}>
              👤 Información del Cliente
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '13px', fontWeight: '600' }}>
                  NOMBRE COMPLETO
                </p>
                <p style={{ margin: 0, fontSize: '18px', color: '#333', fontWeight: '600' }}>
                  {reserva.usuario.nombre} {reserva.usuario.apellido}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '13px', fontWeight: '600' }}>
                  📞 TELÉFONO
                </p>
                <p style={{ margin: 0, fontSize: '18px', color: '#333', fontWeight: '700' }}>
                  🇧🇴 +591 {reserva.usuario.telefono}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '13px', fontWeight: '600' }}>
                  📧 EMAIL
                </p>
                <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
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
            borderRadius: '12px',
            padding: '25px',
            border: '2px solid #ffc107',
            marginBottom: '30px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#f57c00', fontSize: '18px' }}>
              📝 Notas Especiales
            </h3>
            <p style={{ margin: 0, fontSize: '16px', color: '#333', lineHeight: '1.6' }}>
              {reserva.notas}
            </p>
          </div>
        )}

        {/* Formulario para cambiar estado */}
        <div style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          padding: '25px',
          border: '2px solid #e0e0e0'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', fontSize: '20px' }}>
            ✏️ Cambiar Estado de la Reserva
          </h3>
          <form onSubmit={guardarEstado}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#555'
              }}>
                Selecciona el nuevo estado:
              </label>
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                <option value="pendiente">⏳ Pendiente</option>
                <option value="confirmada">✅ Confirmada</option>
                <option value="cancelada">❌ Cancelada</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196f3'}
            >
              💾 Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
