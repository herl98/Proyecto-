import { useState, type FormEvent } from "react";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import { storageService } from "../services/storageService";

type RegistroDano = { id: string; laboratorio: string; tipoEquipo: string; codigo: string; cantidadDaniada: number; registradoPor: string; actualizadoEn: string };
const STORAGE_KEY = "laboratory_equipment_status";
const laboratorios = ["Primaria", "Diseño Gráfico", "Sistemas", "Química"];
const tiposEquipo = ["Computadora", "Microscopio", "Proyector", "Impresora", "Balanzas", "Material de laboratorio", "Otro"];

function EquipmentPage() {
  const user = authRepository.getCurrentUser();
  const isSystemAdmin = user?.role === "ADMIN_SISTEMA";
  const canRegister = user?.role === "ADMIN_COLEGIO" || user?.role === "DOCENTE" || isSystemAdmin;
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registros, setRegistros] = useState<RegistroDano[]>(() => storageService.get<RegistroDano[]>(STORAGE_KEY) ?? []);
  const [laboratorio, setLaboratorio] = useState("Primaria");
  const [tipoEquipo, setTipoEquipo] = useState("Computadora");
  const [codigo, setCodigo] = useState("");
  const [cantidadDaniada, setCantidadDaniada] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const guardarRegistros = (nuevos: RegistroDano[]) => {
    setRegistros(nuevos);
    storageService.set(STORAGE_KEY, nuevos);
  };

  const registrarEquipo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codigoNormalizado = codigo.trim();
    if (!codigoNormalizado) {
      setMensaje("Ingresa el código del equipo.");
      return;
    }
    if (registros.some((item) => item.codigo.toLowerCase() === codigoNormalizado.toLowerCase())) {
      setMensaje("Ya existe un registro con ese código. Usa la opción de editar o consulta el registro existente.");
      return;
    }
    const nuevo: RegistroDano = {
      id: `equipo-${Date.now()}`,
      laboratorio,
      tipoEquipo,
      codigo: codigoNormalizado,
      cantidadDaniada,
      registradoPor: user?.name ?? "Usuario",
      actualizadoEn: new Date().toISOString(),
    };
    guardarRegistros([nuevo, ...registros]);
    setCodigo("");
    setCantidadDaniada(1);
    setMensaje("Estado del equipo guardado correctamente. Ya está disponible para los demás roles en este navegador.");
    setModalAbierto(false);
  };

  const eliminarEquipo = (id: string) => {
    guardarRegistros(registros.filter((item) => item.id !== id));
  };

  return (
    <SectionPage eyebrow="Equipos" title="Equipos de laboratorio" description="Consulta el estado de los equipos. El docente puede reportar su condición y los administradores pueden supervisar los registros.">
      <div className="section-page__grid">
        <article className="section-page__card"><strong>{registros.length}</strong><span>Equipos con estado registrado</span></article>
        <article className="section-page__card"><strong>{registros.reduce((total, item) => total + item.cantidadDaniada, 0)}</strong><span>Total de unidades dañadas</span></article>
      </div>
      {canRegister && <div style={{ marginTop: "2rem" }}><button type="button" className="section-page__button" onClick={() => { setMensaje(""); setModalAbierto(true); }}>Registrar estado de equipo</button></div>}
      {mensaje && <p role="status" style={{ marginTop: "1rem", color: "#fde68a" }}>{mensaje}</p>}
      <div style={{ marginTop: "2rem" }}>
        <h2>Estado de los equipos registrados</h2>
        {registros.length === 0 ? <p style={{ color: "#cbd5e1" }}>Todavía no hay equipos registrados. Usa “Registrar estado de equipo” para añadir el primero.</p> : <div className="section-page__list" style={{ marginTop: "1rem" }}>
          {registros.map((item) => <div className="section-page__list-item" key={item.id}>
            <span><strong>{item.tipoEquipo}</strong><br />Laboratorio: {item.laboratorio}<br />Código: {item.codigo}<br />Unidades dañadas: {item.cantidadDaniada}<br />Registrado por: {item.registradoPor}<br />Última actualización: {new Intl.DateTimeFormat("es-BO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.actualizadoEn))}</span>
            {isSystemAdmin && <button type="button" className="section-page__button" onClick={() => eliminarEquipo(item.id)}>Eliminar</button>}
          </div>)}
        </div>}
      </div>
      {modalAbierto && <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalAbierto(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1000 }}>
        <section role="dialog" aria-modal="true" aria-labelledby="titulo-modal-equipo" style={{ width: "100%", maxWidth: "520px", padding: "2rem", borderRadius: "20px", background: "#0f172a", border: "1px solid rgba(148,163,184,.3)" }}>
          <h2 id="titulo-modal-equipo">Registrar estado de equipo</h2>
          <form onSubmit={registrarEquipo}>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Laboratorio<select value={laboratorio} onChange={(event) => setLaboratorio(event.target.value)} required>{laboratorios.map((name) => <option key={name}>{name}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Tipo de equipo<select value={tipoEquipo} onChange={(event) => setTipoEquipo(event.target.value)} required>{tiposEquipo.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Código del equipo<input value={codigo} onChange={(event) => setCodigo(event.target.value)} placeholder="Ej. EQ-SIS-001" required /></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Cantidad dañada<input type="number" min="0" step="1" value={cantidadDaniada} onChange={(event) => setCantidadDaniada(Number(event.target.value))} required /></label>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".75rem", marginTop: "1.5rem" }}><button type="button" className="section-page__button" onClick={() => setModalAbierto(false)}>Cancelar</button><button type="submit" className="section-page__button">Guardar estado</button></div>
          </form>
        </section>
      </div>}
    </SectionPage>
  );
}
export default EquipmentPage;
