import SectionPage from "../components/layout/SectionPage";

function IncidentsPage() {
  return <SectionPage eyebrow="Seguimiento" title="Reporte de incidencias" description="Registra novedades para mantener cada ambiente seguro y en buenas condiciones.">
    <div className="section-page__list">
      <div className="section-page__list-item"><span>Sin incidencias pendientes por atender.</span><small>Todo al día</small></div>
      <button className="section-page__button" type="button">Registrar incidencia</button>
    </div>
  </SectionPage>;
}
export default IncidentsPage;
