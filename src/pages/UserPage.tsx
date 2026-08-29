import { useNavigate } from "react-router-dom";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";

function UserPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const logout = () => { authRepository.logout(); navigate("/login", { replace: true }); };
  return <SectionPage eyebrow="Cuenta" title="Mi perfil" description="Consulta la información de la sesión actual y administra tu acceso.">
    <div className="section-page__grid">
      <article className="section-page__card"><strong>{user?.name ?? "Sin sesión"}</strong><span>{user ? `Carnet ${user.carnet} · ${user.role}` : "Inicia sesión para consultar tus datos."}</span></article>
    </div>
    {user && <p><button className="section-page__button" type="button" onClick={logout}>Cerrar sesión</button></p>}
  </SectionPage>;
}
export default UserPage;
