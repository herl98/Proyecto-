import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";

function InventoryPage() {
  const user = authRepository.getCurrentUser();
  return (
    <SectionPage eyebrow="Control general" title="Inventario general" description="Consulta el inventario global de equipos y materiales de los laboratorios.">
      <div className="section-page__grid">
        <article className="section-page__card"><strong>4</strong><span>Laboratorios registrados</span></article>
        <article className="section-page__card"><strong>Vista general</strong><span>Acceso autorizado para administrador del colegio y administrador del sistema.</span></article>
      </div>
      <p style={{ marginTop: "1.5rem", color: "#cbd5e1" }}>Sesión: {user?.name ?? "Usuario"}. Los registros que actualmente se crean dentro de las pantallas de equipos y mantenimiento se mantienen en el estado local de cada pantalla; para un inventario consolidado y persistente será necesario conectarlos a una base de datos compartida.</p>
    </SectionPage>
  );
}
export default InventoryPage;
