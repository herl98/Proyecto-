import { NavLink } from "react-router-dom";

import "./AppSidebar.css";

const navigationItems = [
  { to: "/", label: "Inicio", icon: "⌂", end: true },
  { to: "/equipos", label: "Equipos", icon: "⚗" },
  { to: "/incidencias", label: "Incidencias", icon: "!" },
  { to: "/mantenimiento", label: "Mantenimiento", icon: "◷" },
  { to: "/usuario", label: "Usuario", icon: "◉" },
];

function AppSidebar() {
  return (
    <aside className="app-sidebar" aria-label="Navegación principal">
      <NavLink className="app-sidebar__brand" to="/">
        <span className="app-sidebar__brand-icon" aria-hidden="true">🔬</span>
        <span>Laboratorios <strong>DBS</strong></span>
      </NavLink>

      <nav className="app-sidebar__nav" aria-label="Secciones del sistema">
        {navigationItems.map((item) => (
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
