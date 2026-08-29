import SectionPage from "../components/layout/SectionPage";

function EquipmentPage() {
  return <SectionPage eyebrow="Inventario" title="Equipos de laboratorio" description="Consulta y controla los recursos disponibles para cada práctica.">
    <div className="section-page__grid">
      <article className="section-page__card"><strong>18</strong><span>Microscopios disponibles</span></article>
      <article className="section-page__card"><strong>12</strong><span>Kits de química listos</span></article>
      <article className="section-page__card"><strong>4</strong><span>Equipos en revisión</span></article>
    </div>
  </SectionPage>;
}
export default EquipmentPage;
