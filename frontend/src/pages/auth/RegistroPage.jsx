import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../../api/authApi";

export default function RegistroPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (formData.nombre.trim().length > 50) {
      newErrors.nombre = "El nombre no puede tener más de 50 caracteres";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
    } else if (formData.apellido.trim().length > 50) {
      newErrors.apellido = "El apellido no puede tener más de 50 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Debe ser un email válido";
    }

    // Validar teléfono (obligatorio)
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9]{8}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 8 dígitos numéricos";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (formData.password.length > 100) {
      newErrors.password = "La contraseña no puede tener más de 100 caracteres";
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación especial para teléfono: solo números, máximo 8 dígitos
    if (name === 'telefono') {
      const onlyNumbers = value.replace(/[^0-9]/g, '');
      const limitedValue = onlyNumbers.slice(0, 8);
      setFormData(prev => ({
        ...prev,
        [name]: limitedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Preparar datos para enviar (sin confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;

      console.log('Enviando registro:', dataToSend);
      const response = await registerRequest(dataToSend);
      console.log('Respuesta registro:', response);
      
      alert("¡Registro exitoso! Ahora puedes iniciar sesión");
      navigate("/login");
    } catch (error) {
      console.error("Error en registro:", error);
      console.error("Error response:", error.response);
      
      // Manejar errores del servidor
      if (error.response?.data?.message) {
        const message = error.response.data.message;
        
        if (Array.isArray(message)) {
          // Errores de validación del backend
          const backendErrors = {};
          message.forEach(msg => {
            if (msg.includes('nombre')) backendErrors.nombre = msg;
            else if (msg.includes('apellido')) backendErrors.apellido = msg;
            else if (msg.includes('email')) backendErrors.email = msg;
            else if (msg.includes('teléfono') || msg.includes('telefono')) backendErrors.telefono = msg;
            else if (msg.includes('contraseña') || msg.includes('password')) backendErrors.password = msg;
          });
          setErrors(backendErrors);
        } else {
          // Error específico como "El email ya está registrado"
          if (message.toLowerCase().includes('email')) {
            setErrors({ email: message });
          } else {
            alert(message);
          }
        }
      } else {
        alert("Error al registrar usuario. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        maxWidth: '500px',
        width: '100%',
        padding: '40px 30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '10px',
          fontSize: '28px'
        }}>
          Crear Cuenta
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Regístrate para hacer tus pedidos
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan"
              style={{
                width: 'calc(100% - 30px)',
                padding: '12px 15px',
                border: errors.nombre ? '2px solid #f44336' : '2px solid #aaa',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => !errors.nombre && (e.target.style.borderColor = '#aaa')}
            />
            {errors.nombre && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.nombre}
              </p>
            )}
          </div>

          {/* Apellido */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Apellido *
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: Pérez"
              style={{
                width: 'calc(100% - 30px)',
                padding: '12px 15px',
                border: errors.apellido ? '2px solid #f44336' : '2px solid #aaa',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => !errors.apellido && (e.target.style.borderColor = '#aaa')}
            />
            {errors.apellido && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.apellido}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@email.com"
              style={{
                width: 'calc(100% - 30px)',
                padding: '12px 15px',
                border: errors.email ? '2px solid #f44336' : '2px solid #aaa',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => !errors.email && (e.target.style.borderColor = '#aaa')}
            />
            {errors.email && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Teléfono * 🇧🇴
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
                color: '#666',
                fontWeight: '600'
              }}>
                +591
              </span>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="71234567"
                maxLength={8}
                inputMode="numeric"
                pattern="[0-9]*"
                style={{
                  width: 'calc(100% - 30px)',
                  padding: '12px 15px 12px 60px',
                  border: errors.telefono ? '2px solid #f44336' : '2px solid #aaa',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => !errors.telefono && (e.target.style.borderColor = '#aaa')}
              />
            </div>
            {errors.telefono && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.telefono}
              </p>
            )}
            <p style={{ 
              fontSize: '12px', 
              color: '#999', 
              marginTop: '5px',
              fontStyle: 'italic'
            }}>
              Número boliviano de 8 dígitos
            </p>
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              style={{
                width: 'calc(100% - 30px)',
                padding: '12px 15px',
                border: errors.password ? '2px solid #f44336' : '2px solid #aaa',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => !errors.password && (e.target.style.borderColor = '#aaa')}
            />
            {errors.password && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite la contraseña"
              style={{
                width: 'calc(100% - 30px)',
                padding: '12px 15px',
                border: errors.confirmPassword ? '2px solid #f44336' : '2px solid #aaa',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => !errors.confirmPassword && (e.target.style.borderColor = '#aaa')}
            />
            {errors.confirmPassword && (
              <p style={{ color: '#f44336', fontSize: '13px', marginTop: '5px' }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#ccc' : '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: '15px'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#5568d3')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#667eea')}
          >
            {loading ? '⏳ Registrando...' : '✓ Crear Cuenta'}
          </button>

          {/* Link a login */}
          <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
            ¿Ya tienes cuenta?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
