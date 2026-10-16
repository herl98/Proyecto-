import { useState, type FormEvent } from "react";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";

type RegistroDano = { id: number; laboratorio: string; tipoEquipo: string; codigo: string; cantidadDaniada: number };
const laboratorios = ["Primaria", "Diseño Gráfico", "Sistemas", "Química"];
const tiposEquipo = ["Computadora", "Microscopio", "Proyector", "Impresora", "Balanzas", "Material de laboratorio", "Otro"];

function EquipmentPage() {
  const user = authRepository.getCurrentUser();
  const isSystemAdmin = user?.role === "ADMIN_SISTEMA";
  const canRegister = user?.role === "ADMIN_COLEGIO" || isSystemAdmin;
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registros, setRegistros] = useState<RegistroDano[]>([]);
  const [laboratorio, setLaboratorio] = useState("Primaria");
  const [tipoEquipo, setTipoEquipo] = useState("Computadora");
  const [codigo, setCodigo] = useState("");
  const [cantidadDaniada, setCantidadDaniada] = useState(1);

  const registrarEquipo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistros((current) => [{ id: Date.now(), laboratorio, tipoEquipo, codigo: codigo.trim(), cantidadDaniada }, ...current]);
    setCodigo("");
    setCantidadDaniada(1);
    setModalAbierto(false);
  };

  return (
    <SectionPage eyebrow="Equipos" title="Equipos de laboratorio" description="Consulta el estado de los equipos y registra nuevos equipos según los permisos de tu rol.">
      <div className="section-page__grid">
        <article className="section-page__card"><strong>{registros.length}</strong><span>Registros de equipos dañados en esta sesión</span></article>
        <article className="section-page__card"><strong>{registros.reduce((total, item) => total + item.cantidadDaniada, 0)}</strong><span>Total de equipos dañados registrados</span></article>
      </div>
      {canRegister && <div style={{ marginTop: "2rem" }}><button type="button" className="section-page__button" onClick={() => setModalAbierto(true)}>Registrar equipo</button></div>}
      <div style={{ marginTop: "2rem" }}>
        <h2>Estado de los equipos</h2>
        {registros.length === 0 ? <p style={{ color: "#cbd5e1" }}>No hay registros de equipos en esta sesión de demostración.</p> : <div className="section-page__list" style={{ marginTop: "1rem" }}>
          {registros.map((item) => <div className="section-page__list-item" key={item.id}>
            <span><strong>{item.tipoEquipo}</strong><br />Laboratorio: {item.laboratorio}<br />Código: {item.codigo}<br />Cantidad dañada: {item.cantidadDaniada}</span>
            {isSystemAdmin && <button type="button" className="section-page__button" onClick={() => setRegistros((current) => current.filter((record) => record.id !== item.id))}>Eliminar</button>}
          </div>)}
        </div>}
      </div>
      {modalAbierto && <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalAbierto(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1000 }}>
        <section role="dialog" aria-modal="true" aria-labelledby="titulo-modal-equipo" style={{ width: "100%", maxWidth: "520px", padding: "2rem", borderRadius: "20px", background: "#0f172a", border: "1px solid rgba(148,163,184,.3)" }}>
          <h2 id="titulo-modal-equipo">Registrar equipo</h2>
          <form onSubmit={registrarEquipo}>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Laboratorio<select value={laboratorio} onChange={(event) => setLaboratorio(event.target.value)} required>{laboratorios.map((name) => <option key={name}>{name}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Tipo de equipo<select value={tipoEquipo} onChange={(event) => setTipoEquipo(event.target.value)} required>{tiposEquipo.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Código del equipo<input value={codigo} onChange={(event) => setCodigo(event.target.value)} placeholder="Ej. EQ-SIS-001" required /></label>
            <label style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>Cantidad dañada<input type="number" min="0" value={cantidadDaniada} onChange={(event) => setCantidadDaniada(Number(event.target.value))} required /></label>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".75rem", marginTop: "1.5rem" }}><button type="button" className="section-page__button" onClick={() => setModalAbierto(false)}>Cancelar</button><button type="submit" className="section-page__button">Guardar equipo</button></div>
          </form>
        </section>
      </div>}
    </SectionPage>
  );
}
export default EquipmentPage;
