import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Intentando login con:", email);
      await login(email, password);
      console.log("Login exitoso, navegando a /platos");
      navigate("/platos");
    } catch (err) {
      console.error("Error en login:", err);
      console.error("Respuesta del servidor:", err.response?.data);
      setError(err.response?.data?.message || "Credenciales inválidas o error en el servidor");
    }
  };

  return (
    <div className="page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#d6f6fc" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #0002", padding: "2.5rem 2rem", maxWidth: 350, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img src={logo} alt="Logo" style={{ width: 120, marginBottom: 8 }} />
        </div>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          <label style={{ fontWeight: 500, color: "#34495e" }}>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", marginTop: 6, padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "1rem" }}
            />
          </label>

          {error && <p style={{ color: "#e74c3c", background: "#fdecea", borderRadius: 8, padding: "0.7rem", textAlign: "center", fontWeight: 500 }}>{error}</p>}

          <button type="submit" style={{ padding: "0.8rem 0", borderRadius: 8, fontWeight: 600, background: "#2980b9", color: "#fff", border: "none", fontSize: "1.1rem", cursor: "pointer", marginTop: "0.5rem" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}