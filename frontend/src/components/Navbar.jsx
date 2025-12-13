import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { useNotifications } from "../context/NotificationsContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const carrito = useCarrito();
  const { pendingReservations, pendingOrders, totalNotifications } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navBtnStyle = {
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#2980b9",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "1rem",
    border: "none",
    boxShadow: "0 1px 6px #0001",
    transition: "background 0.2s",
    cursor: "pointer",
    marginRight: "8px"
  };

  return (
    <nav
      style={{
        backgroundColor: "#d6f6fc",
        padding: "12px 20px",
        color: "#1a3557",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #b3e6f7"
      }}
    >
      {/* LOGO + LINKS */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <img src={logo} alt="Logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1a3557", letterSpacing: 2 }}>
            SMARTRESTAURANT
          </span>
        </Link>

        {/* LINKS SI ESTÁ LOGEADO */}
        {user && (
          <>
            {/* PLATOS */}
            <Link to="/platos" style={navBtnStyle}>Platos</Link>

            {/* USER */}
            {user.rol === 2 && (
              <>
                <Link to="/carrito" style={{ ...navBtnStyle, position: 'relative' }}>
                  Carrito
                  {carrito?.totalItems > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '2px solid white'
                    }}>
                      {carrito.totalItems}
                    </span>
                  )}
                </Link>
                <Link to="/mis-pedidos" style={navBtnStyle}>Mis pedidos</Link>
                <Link to="/reservas/crear" style={navBtnStyle}>Nueva reserva</Link>
                <Link to="/mis-reservas" style={navBtnStyle}>Mis reservas</Link>
              </>
            )}

            {/* ADMIN */}
            {user.rol === 1 && (
              <>
                <Link to="/platos/crear" style={navBtnStyle}>Crear plato</Link>
                <Link to="/pedidos" style={{ ...navBtnStyle, position: 'relative' }}>
                  Pedidos (Admin)
                  {pendingOrders > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }}>
                      {pendingOrders}
                    </span>
                  )}
                </Link>
                <Link to="/reservas" style={{ ...navBtnStyle, position: 'relative' }}>
                  Reservas (Admin)
                  {pendingReservations > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '2px solid white',
                      animation: 'pulse 2s infinite'
                    }}>
                      {pendingReservations}
                    </span>
                  )}
                </Link>
                <Link to="/categorias" style={navBtnStyle}>Categorías</Link>
              </>
            )}
          </>
        )}
      </div>

      {/* DERECHA – USER INFO */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {!user ? (
          <Link
            to="/login"
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              background: "#2980b9",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem",
              border: "none",
              boxShadow: "0 1px 6px #0001",
              transition: "background 0.2s",
              cursor: "pointer"
            }}
          >
            Iniciar sesión
          </Link>
        ) : (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {(user.nombre || user.name || user.email).charAt(0).toUpperCase()}
              </div>
              <span style={{ 
                fontWeight: '600',
                color: '#1a3557',
                fontSize: '15px'
              }}>
                {user.nombre || user.name || user.email.split('@')[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#dc2626"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#ef4444"}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>

      {/* ESTILOS DE LINKS */}
      <style>{`
        .nav-link {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 14px;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
      `}</style>
    </nav>
  );
}