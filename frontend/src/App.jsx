import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { ToastContainer } from "./components/Toast";
import WelcomeAnimation from "./components/WelcomeAnimation";
import AppRouter from "./router/AppRouter";

function AppContent() {
  const { showWelcome, user } = useAuth();
  
  return (
    <>
      {showWelcome && user && <WelcomeAnimation nombre={user.nombre || user.name} />}
      <ToastContainer />
      <AppRouter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <NotificationsProvider>
            <AppContent />
          </NotificationsProvider>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;