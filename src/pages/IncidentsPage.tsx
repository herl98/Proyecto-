import SectionPage from "../components/layout/SectionPage";
import "./IncidentsPage.css";

function IncidentsPage() {
  return (
    <SectionPage eyebrow="Seguimiento" title="Reporte de incidencias" description="Registra novedades para mantener cada ambiente seguro y en buenas condiciones.">
      <section className="incidents-page__empty-state" aria-label="Estado de incidencias">
        <div className="incidents-page__icon" aria-hidden="true">✓</div>
        <span className="incidents-page__label">Todo al día</span>
        <h2>No hay incidencias pendientes</h2>
        <p>Los ambientes y equipos registrados no tienen novedades por atender en este momento.</p>
        <button className="section-page__button incidents-page__button" type="button">Registrar incidencia</button>
      </section>
    </SectionPage>
  );
}
export default IncidentsPage;
