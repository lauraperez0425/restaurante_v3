import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
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
            <Link to="/carrito" style={navBtnStyle}>🛒 Carrito</Link>

            {/* USER */}
            {user.role === "user" && (
              <>
                <Link to="/mis-pedidos" style={navBtnStyle}>Mis pedidos</Link>
                <Link to="/reservas/crear" style={navBtnStyle}>Nueva reserva</Link>
                <Link to="/mis-reservas" style={navBtnStyle}>Mis reservas</Link>
              </>
            )}

            {/* ADMIN */}
            {user.role === "admin" && (
              <>
                <Link to="/platos/crear" style={navBtnStyle}>Crear plato</Link>
                <Link to="/pedidos" style={navBtnStyle}>Pedidos (Admin)</Link>
                <Link to="/reservas" style={navBtnStyle}>Reservas (Admin)</Link>
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
            <span style={{ opacity: 0.8 }}>
              {user.name || user.email} ({user.role})
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "white",
                cursor: "pointer",
              }}
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
      `}</style>
    </nav>
  );
}