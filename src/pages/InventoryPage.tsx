import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import { storageService } from "../services/storageService";

type EquipmentRecord = { id: string; laboratorio: string; tipoEquipo: string; codigo: string; cantidadDaniada: number; registradoPor: string; actualizadoEn: string };
type MaintenanceRecord = { id: string; laboratorio: string; tipoEquipo: string; fecha: string; responsable: string; estado: string; registradaPor: string };

function InventoryPage() {
  const user = authRepository.getCurrentUser();
  const equipment = storageService.get<EquipmentRecord[]>("laboratory_equipment_status") ?? [];
  const maintenance = storageService.get<MaintenanceRecord[]>("laboratory_maintenance_records") ?? [];
  const incidents = storageService.get<Array<{ id: string; status: string }>>("laboratory_incidences") ?? [];
  const damagedUnits = equipment.reduce((total, item) => total + item.cantidadDaniada, 0);

  return (
    <SectionPage eyebrow="Control general" title="Inventario general" description="Consulta los registros de equipos, sus estados y las revisiones de mantenimiento de los laboratorios.">
      <div className="section-page__grid">
        <article className="section-page__card"><strong>4</strong><span>Laboratorios registrados</span></article>
        <article className="section-page__card"><strong>{equipment.length}</strong><span>Equipos con estado registrado</span></article>
        <article className="section-page__card"><strong>{damagedUnits}</strong><span>Unidades dañadas reportadas</span></article>
        <article className="section-page__card"><strong>{maintenance.length}</strong><span>Revisiones de mantenimiento</span></article>
        <article className="section-page__card"><strong>{incidents.length}</strong><span>Incidencias registradas</span></article>
      </div>
      <p style={{ marginTop: "1.5rem", color: "#cbd5e1" }}>Sesión: {user?.name ?? "Usuario"}. Estos datos se guardan en el almacenamiento local del navegador y se comparten entre las pantallas de este mismo navegador. No constituyen todavía una base de datos compartida entre distintos dispositivos.</p>
      <h2 style={{ marginTop: "2rem" }}>Equipos y estado reportado</h2>
      {equipment.length === 0 ? <p style={{ color: "#cbd5e1" }}>Todavía no hay equipos registrados. Registra un estado en la sección Equipos para que aparezca aquí.</p> : <div className="section-page__list">{equipment.map((item) => <div className="section-page__list-item" key={item.id}><span><strong>{item.tipoEquipo}</strong><br />Código: {item.codigo}<br />Laboratorio: {item.laboratorio}<br />Unidades dañadas: {item.cantidadDaniada}</span></div>)}</div>}
      <h2 style={{ marginTop: "2rem" }}>Mantenimiento</h2>
      {maintenance.length === 0 ? <p style={{ color: "#cbd5e1" }}>Aún no hay revisiones de mantenimiento registradas.</p> : <div className="section-page__list">{maintenance.map((item) => <div className="section-page__list-item" key={item.id}><span><strong>{item.tipoEquipo}</strong><br />Laboratorio: {item.laboratorio}<br />Fecha: {item.fecha}<br />Responsable: {item.responsable}<br />Estado: {item.estado}</span></div>)}</div>}
    </SectionPage>
  );
}
export default InventoryPage;
