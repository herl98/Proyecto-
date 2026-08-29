import { useNavigate } from "react-router-dom";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import "./UserPage.css";

function UserPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const logout = () => { authRepository.logout(); navigate("/login", { replace: true }); };
  return (
    <SectionPage eyebrow="Cuenta" title="Mi perfil" description="Consulta la información de la sesión actual y administra tu acceso.">
      <div className="user-page__profile-card">
        <div className="user-page__avatar" aria-hidden="true">{user?.name.charAt(0).toUpperCase() ?? "?"}</div>
        <div className="user-page__details">
          <span className="user-page__status"><i aria-hidden="true" />{user ? "Sesión activa" : "Sin sesión activa"}</span>
          <h2>{user?.name ?? "Aún no has iniciado sesión"}</h2>
          <p>{user ? "Tu acceso está listo para gestionar los recursos del laboratorio." : "Inicia sesión para consultar y administrar tu información."}</p>
        </div>
      </div>

      {user && (
        <div className="user-page__information" aria-label="Información de la cuenta">
          <article className="user-page__detail"><span>Carnet</span><strong>{user.carnet}</strong></article>
          <article className="user-page__detail"><span>Rol</span><strong>{user.role}</strong></article>
        </div>
      )}

      {user && <button className="section-page__button user-page__logout" type="button" onClick={logout}>Cerrar sesión</button>}
    </SectionPage>
  );
}
export default UserPage;
