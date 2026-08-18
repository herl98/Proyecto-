import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


import LoginForm from "../../components/auth/LoginForm";
import "./LoginPage.css";
import { authRepository } from "../../repositories/authRepository";


import type { LoginCredentials } from "../../types/auth";


function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");


  if (authRepository.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }


  const handleLogin = (credentials: LoginCredentials) => {
    setError("");


    const user = authRepository.login(credentials);


    if (!user) {
      setError("El carnet o la contraseña son incorrectos.");
      return;
    }


    navigate("/", { replace: true });
  };


  return (
    <main className="login-page">
      <section className="login-page__hero" aria-label="Presentación del sistema">
        <div className="login-page__content">
          <span className="login-page__badge">Colegio Don Bosco Sucre</span>
          <h2 className="login-page__title">
            Sistema para el cuidado de los laboratorios
          </h2>
          <p className="login-page__description">
            Administra accesos, promueve el uso responsable de equipos y acompaña
            el mantenimiento de los espacios académicos con una experiencia clara,
            moderna y segura.
          </p>

          <div className="login-page__stats" aria-label="Beneficios principales">
            <div className="login-page__stat">
              <strong>Control</strong>
              <span>Seguimiento de usuarios autorizados</span>
            </div>
            <div className="login-page__stat">
              <strong>Orden</strong>
              <span>Gestión responsable de ambientes</span>
            </div>
            <div className="login-page__stat">
              <strong>Seguridad</strong>
              <span>Protección de equipos y recursos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="login-page__panel" aria-label="Formulario de inicio de sesión">
        <LoginForm
          error={error}
          onSubmit={handleLogin}
        />
      </section>
    </main>
  );
}


export default LoginPage;
