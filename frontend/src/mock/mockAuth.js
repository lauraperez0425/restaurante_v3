export async function mockLogin(email, password) {
  // Usuario de prueba (con rol admin)
  if (email === "admin@test.com" && password === "123456") {
    return {
      user: {
        id: 1,
        name: "Admin Test",
        email: "admin@test.com",
        role: "admin",
      },
      token: "fake-jwt-token-123",
    };
  }

  // Usuario normal
  if (email === "user@test.com" && password === "123456") {
    return {
      user: {
        id: 2,
        name: "Usuario Test",
        email: "user@test.com",
        role: "user",
      },
      token: "fake-jwt-token-456",
    };
  }

  throw new Error("Credenciales incorrectas");
}