import { NavLink } from "react-router-dom";
import { authRepository } from "../../repositories/authRepository";
import type { UserRole } from "../../types/auth";
import "./AppSidebar.css";

const navigationItems: { to: string; label: string; icon: string; roles: UserRole[]; end?: boolean }[] = [
  { to: "/inicio", label: "Inicio", icon: "⌂", roles: ["ADMIN_COLEGIO", "DOCENTE", "ADMIN_SISTEMA"], end: true },
  { to: "/equipos", label: "Equipos", icon: "⚗", roles: ["ADMIN_COLEGIO", "DOCENTE", "ADMIN_SISTEMA"] },
  { to: "/incidencias", label: "Incidencias", icon: "!", roles: ["ADMIN_COLEGIO", "DOCENTE", "ADMIN_SISTEMA"] },
  { to: "/mantenimiento", label: "Mantenimiento", icon: "◷", roles: ["ADMIN_COLEGIO", "DOCENTE", "ADMIN_SISTEMA"] },
  { to: "/usuario", label: "Usuario", icon: "◉", roles: ["ADMIN_COLEGIO", "DOCENTE", "ADMIN_SISTEMA"] },
];

function AppSidebar() {
  const user = authRepository.getCurrentUser();
  const visibleItems = navigationItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside className="app-sidebar" aria-label="Navegación principal">
      <NavLink className="app-sidebar__brand" to="/inicio">
        <span className="app-sidebar__brand-icon" aria-hidden="true">🔬</span>
        <span>Laboratorios <strong>DBS</strong></span>
      </NavLink>
      <nav className="app-sidebar__nav" aria-label="Secciones del sistema">
        {visibleItems.map((item) => (
          <NavLink
            className={({ isActive }) => `app-sidebar__link${isActive ? " app-sidebar__link--active" : ""}`}
            end={item.end}
            key={item.to}
            to={item.to}
          >
            <span className="app-sidebar__link-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="app-sidebar__footer">Don Bosco Sucre<br />Gestión responsable</p>
    </aside>
  );
}

export default AppSidebar;
