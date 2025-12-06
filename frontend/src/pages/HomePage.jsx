import logo from "../assets/logo.png";

export default function HomePage() {
  return (
    <div className="page" style={{ minHeight: "100vh", background: "#b3e6f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img src={logo} alt="Logo" style={{ width: 320, maxWidth: "80vw", marginBottom: "2rem" }} />
      <h1 style={{ color: "#1a3557", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        Bienvenido al Restaurante
      </h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.85, color: "#1a3557" }}>
        Selecciona una opción del menú superior para comenzar.
      </p>
    </div>
  );
}