import logo from "../../assets/logo.png";

export default function HomePage() {
  return (
    <div style={{ 
      position: "fixed",
      top: "60px",
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #89CFF0 0%, #b3e6f7 50%, #E0F4FF 100%)", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "2rem",
      overflow: "auto"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        padding: "3rem",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(26, 53, 87, 0.15)",
        textAlign: "center",
        maxWidth: "600px"
      }}>
        <img src={logo} alt="Logo" style={{ width: 280, maxWidth: "80%", marginBottom: "2rem" }} />
        <h1 style={{ 
          color: "#1a3557", 
          fontSize: "2.5rem", 
          fontWeight: 700, 
          marginBottom: "1rem",
          letterSpacing: "-0.5px"
        }}>
          Bienvenido al Restaurante
        </h1>
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#475569", 
          lineHeight: "1.6"
        }}>
          Selecciona una opción del menú superior para comenzar.
        </p>
      </div>
    </div>
  );
}