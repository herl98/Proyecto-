import { useState, type FormEvent } from "react";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import { storageService } from "../services/storageService";

type Revision = { id: string; laboratorio: string; tipoEquipo: string; fecha: string; responsable: string; estado: "Programada" | "Realizada"; registradaPor: string };
const STORAGE_KEY = "laboratory_maintenance_records";
const laboratorios = ["Primaria", "Diseño Gráfico", "Sistemas", "Química"];
const tiposEquipo = ["Computadoras", "Microscopios", "Proyectores", "Impresoras", "Balanzas", "Material de laboratorio", "Otro"];

function MaintenancePage() {
  const user = authRepository.getCurrentUser();
  const isSystemAdmin = user?.role === "ADMIN_SISTEMA";
  const [modalAbierto, setModalAbierto] = useState(false);
  const [revisiones, setRevisiones] = useState<Revision[]>(() => storageService.get<Revision[]>(STORAGE_KEY) ?? []);
  const [laboratorio, setLaboratorio] = useState("Primaria");
  const [tipoEquipo, setTipoEquipo] = useState("Computadoras");
  const [fecha, setFecha] = useState("");
  const [responsable, setResponsable] = useState("");
  const [mensaje, setMensaje] = useState("");

  const guardar = (items: Revision[]) => {
    setRevisiones(items);
    storageService.set(STORAGE_KEY, items);
  };

  const registrarRevision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fecha < new Date().toISOString().slice(0, 10)) {
      setMensaje("Selecciona una fecha igual o posterior a hoy.");
      return;
    }
    const nueva: Revision = { id: `mantenimiento-${Date.now()}`, laboratorio, tipoEquipo, fecha, responsable: responsable.trim(), estado: "Programada", registradaPor: user?.name ?? "Usuario" };
    guardar([nueva, ...revisiones]);
    setFecha("");
    setResponsable("");
    setMensaje("Revisión programada correctamente.");
    setModalAbierto(false);
  };

  const cambiarEstado = (revision: Revision) => {
    guardar(revisiones.map((item) => item.id === revision.id ? { ...item, estado: item.estado === "Programada" ? "Realizada" : "Programada" } : item));
  };

  const eliminarRevision = (id: string) => guardar(revisiones.filter((item) => item.id !== id));

  return (
    <SectionPage eyebrow="Planificación" title="Mantenimiento" description="Programa revisiones preventivas, consulta las tareas existentes y registra el apoyo realizado.">
      <div className="section-page__grid">
        <article className="section-page__card"><strong>{revisiones.length}</strong><span>Revisiones registradas</span></article>
        <article className="section-page__card"><strong>{revisiones.filter((item) => item.estado === "Programada").length}</strong><span>Revisiones pendientes</span></article>
      </div>
      <div style={{ marginTop: "2rem" }}><button type="button" className="section-page__button" onClick={() => { setMensaje(""); setModalAbierto(true); }}>{user?.role === "DOCENTE" ? "Registrar apoyo de mantenimiento" : "Programar mantenimiento"}</button></div>
      {mensaje && <p role="status" style={{ color: "#fde68a", marginTop: "1rem" }}>{mensaje}</p>}
      <div style={{ marginTop: "2rem" }}>
        <h2>Revisiones programadas</h2>
        {revisiones.length === 0 ? <p style={{ color: "#cbd5e1" }}>Aún no hay revisiones registradas. Puedes programar la primera revisión.</p> : <div className="section-page__list" style={{ marginTop: "1rem" }}>
          {revisiones.map((revision) => <div className="section-page__list-item" key={revision.id}>
            <span><strong>{revision.tipoEquipo}</strong><br />Laboratorio: {revision.laboratorio}<br />Fecha: {revision.fecha}<br />Responsable: {revision.responsable}<br />Estado: {revision.estado}<br />Registrado por: {revision.registradaPor}</span>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <button type="button" className="section-page__button" onClick={() => cambiarEstado(revision)}>{revision.estado === "Programada" ? "Marcar realizada" : "Reabrir"}</button>
              {isSystemAdmin && <button type="button" className="section-page__button" onClick={() => eliminarRevision(revision.id)}>Eliminar</button>}
            </div>
          </div>)}
        </div>}
      </div>
      {modalAbierto && <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalAbierto(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1000 }}>
        <section role="dialog" aria-modal="true" aria-labelledby="titulo-modal-mantenimiento" style={{ width: "100%", maxWidth: "520px", padding: "2rem", borderRadius: "20px", background: "#0f172a", border: "1px solid rgba(148,163,184,.3)" }}>
          <h2 id="titulo-modal-mantenimiento">{user?.role === "DOCENTE" ? "Registrar apoyo de mantenimiento" : "Programar revisión preventiva"}</h2>
          <form onSubmit={registrarRevision}>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Laboratorio<select value={laboratorio} onChange={(event) => setLaboratorio(event.target.value)} required>{laboratorios.map((nombre) => <option key={nombre}>{nombre}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Tipo de equipo<select value={tipoEquipo} onChange={(event) => setTipoEquipo(event.target.value)} required>{tiposEquipo.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Fecha de revisión<input type="date" min={new Date().toISOString().slice(0, 10)} value={fecha} onChange={(event) => setFecha(event.target.value)} required /></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Responsable<input value={responsable} onChange={(event) => setResponsable(event.target.value)} placeholder="Nombre del responsable" required /></label>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".75rem", marginTop: "1.5rem" }}><button type="button" className="section-page__button" onClick={() => setModalAbierto(false)}>Cancelar</button><button type="submit" className="section-page__button">Guardar</button></div>
          </form>
        </section>
      </div>}
    </SectionPage>
  );
}
export default MaintenancePage;
