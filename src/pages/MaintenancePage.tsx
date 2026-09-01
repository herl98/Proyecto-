import SectionPage from "../components/layout/SectionPage";

function MaintenancePage() {
  return <SectionPage eyebrow="Planificación" title="Mantenimiento" description="Organiza revisiones preventivas para prolongar la vida útil de los equipos.">
    <div className="section-page__list">
      <div className="section-page__list-item"><span>Revisión de microscopios</span><small>Próxima semana</small></div>
      <div className="section-page__list-item"><span>Inventario de reactivos</span><small>15 de junio</small></div>
    </div>
  </SectionPage>;
}
export default MaintenancePage;
