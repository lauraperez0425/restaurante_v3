import { useEffect, useState } from "react";

export default function WelcomeAnimation({ nombre }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Ocultar después de 3 segundos
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  // Obtener solo el primer nombre
  const primerNombre = nombre?.split(' ')[0] || 'Usuario';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeOut 0.5s ease-out 2.5s forwards'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem 4rem',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'zoomInOut 3s ease-in-out'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '3rem',
          margin: 0,
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          ¡Hola, {primerNombre}!
        </h1>
      </div>

      <style>{`
        @keyframes zoomInOut {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          15% {
            transform: scale(1.1);
            opacity: 1;
          }
          30% {
            transform: scale(1);
          }
          85% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
