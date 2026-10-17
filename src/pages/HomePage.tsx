import { useNavigate } from "react-router-dom";

import { authRepository } from "../repositories/authRepository";
import AppLayout from "../components/layout/AppLayout";
import "./HomePage.css";

const quickActions = [
  { id: "equipos", label: "Equipos", description: "Consulta el estado de los equipos registrados en los laboratorios.", to: "/equipos", icon: "⚗" },
  { id: "incidencia", label: "Reportar incidencia", description: "Registra una falla o problema observado en un equipo.", to: "/incidencias", icon: "!" },
  { id: "mantenimiento", label: "Mantenimiento", description: "Consulta y organiza las revisiones de mantenimiento.", to: "/mantenimiento", icon: "◷" },
];

const careMetrics = [
  { value: "24/7", label: "Control de ambientes" },
  { value: "100%", label: "Uso responsable" },
  { value: "DB", label: "Don Bosco Sucre" },
];

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const isTeacher = user?.role === "DOCENTE";

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppLayout>
      <div className="home-page">
        <section className="home-hero" aria-label="Panel principal del laboratorio">
          <div className="home-hero__content">
            <span className="home-hero__badge">Laboratorios Don Bosco Sucre</span>
            <h1>Cuidado de equipos y materiales del colegio</h1>
            <p>
              Organiza el préstamo, control y mantenimiento de los recursos de laboratorio
              para que cada clase trabaje con seguridad, orden y responsabilidad.
            </p>

            {user ? (
              <div className="home-hero__user-card" id="usuario" aria-label="Datos de la sesión activa">
                <span>Sesión activa</span>
                <strong>{user.name}</strong>
                <small>
                  Carnet {user.carnet} · Rol {user.role}
                </small>
              </div>
            ) : (
              <div className="home-hero__user-card home-hero__user-card--empty" id="usuario">
                <span>No existe una sesión activa.</span>
                <button type="button" onClick={() => navigate("/login")}>Iniciar sesión</button>
              </div>
            )}
          </div>

          <div className="home-hero__visual" aria-hidden="true">
            <div className="lab-card lab-card--main">
              <span className="lab-card__icon">🔬</span>
              <strong>Inventario protegido</strong>
              <p>Microscopios, herramientas, reactivos y kits listos para cada práctica.</p>
            </div>
            <div className="lab-card lab-card--floating">
              <span className="lab-card__icon">🧪</span>
              <strong>Materiales seguros</strong>
            </div>
          </div>
        </section>

        <section className="home-section" aria-label="Acciones rápidas">
          <div className="home-section__header">
            <span>Gestión diaria</span>
            <h2>Acciones rápidas del sistema</h2>
          </div>

          <div className="home-actions">
            {quickActions.map((action) => (
              <article className="home-action" id={action.id} key={action.id}>
                <span className="home-action__check" aria-hidden="true">{action.icon}</span>
                <h3>{action.id === "equipos" && isTeacher ? "Consultar equipos" : action.label}</h3>
                <p>{action.description}</p>
                <button
                  type="button"
                  className="home-action__button"
                  onClick={() => navigate(action.to)}
                >
                  {action.id === "equipos" && isTeacher ? "Ver estado de equipos" : "Abrir sección"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="home-dashboard" aria-label="Indicadores de cuidado">
          {careMetrics.map((metric) => (
            <div className="home-dashboard__metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}

          {user && (
            <button className="home-dashboard__logout" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

export default HomePage;
