import SectionPage from "../components/layout/SectionPage";
import "./MaintenancePage.css";

function MaintenancePage() {
  return (
    <SectionPage eyebrow="Planificación" title="Mantenimiento" description="Organiza revisiones preventivas para prolongar la vida útil de los equipos.">
      <section className="maintenance-page__schedule" aria-label="Próximas tareas de mantenimiento">
        <div className="maintenance-page__heading">
          <div>
            <span>Próximas tareas</span>
            <h2>Calendario de revisiones</h2>
          </div>
          <span className="maintenance-page__count">2 programadas</span>
        </div>
        <div className="maintenance-page__list">
          <article className="maintenance-page__item">
            <div className="maintenance-page__item-icon" aria-hidden="true">⌕</div>
            <div><h3>Revisión de microscopios</h3><p>Verificación preventiva de óptica y enfoque.</p></div>
            <time>Próxima semana</time>
          </article>
          <article className="maintenance-page__item">
            <div className="maintenance-page__item-icon" aria-hidden="true">▣</div>
            <div><h3>Inventario de reactivos</h3><p>Control de existencias y fechas de vencimiento.</p></div>
            <time>15 de junio</time>
          </article>
        </div>
      </section>
    </SectionPage>
  );
}
export default MaintenancePage;
