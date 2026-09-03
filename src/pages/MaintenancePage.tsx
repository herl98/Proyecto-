import { FormEvent, useState } from "react";
import SectionPage from "../components/layout/SectionPage";

type Revision = {
  id: number;
  laboratorio: string;
  tipoEquipo: string;
  fecha: string;
  responsable: string;
};

const laboratorios = [
  "Primaria",
  "Diseño Gráfico",
  "Sistemas",
  "Química",
];

const tiposEquipo = [
  "Computadoras",
  "Microscopios",
  "Proyectores",
  "Impresoras",
  "Balanzas",
  "Material de laboratorio",
  "Otro",
];

function MaintenancePage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [revisiones, setRevisiones] = useState<Revision[]>([]);

  const [laboratorio, setLaboratorio] = useState("Primaria");
  const [tipoEquipo, setTipoEquipo] = useState("Computadoras");
  const [fecha, setFecha] = useState("");
  const [responsable, setResponsable] = useState("");

  const registrarRevision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevaRevision: Revision = {
      id: Date.now(),
      laboratorio,
      tipoEquipo,
      fecha,
      responsable: responsable.trim(),
    };

    setRevisiones((actuales) => [nuevaRevision, ...actuales]);
    setFecha("");
    setResponsable("");
    setModalAbierto(false);
  };

  const eliminarRevision = (id: number) => {
    setRevisiones((actuales) =>
      actuales.filter((revision) => revision.id !== id)
    );
  };

  return (
    <SectionPage
      eyebrow="Planificación"
      title="Mantenimiento"
      description="Organiza revisiones preventivas para prolongar la vida útil de los equipos."
    >
      <div className="section-page__grid">
        <article className="section-page__card">
          <strong>{revisiones.length}</strong>
          <span>Revisiones programadas</span>
        </article>

        <article className="section-page__card">
          <strong>4</strong>
          <span>Laboratorios disponibles</span>
        </article>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          type="button"
          className="section-page__button"
          onClick={() => setModalAbierto(true)}
        >
          Programar revisión preventiva
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Revisiones programadas</h2>

        {revisiones.length === 0 ? (
          <p style={{ color: "#cbd5e1" }}>
            No existen revisiones preventivas programadas.
          </p>
        ) : (
          <div className="section-page__list" style={{ marginTop: "1rem" }}>
            {revisiones.map((revision) => (
              <div
                className="section-page__list-item"
                key={revision.id}
              >
                <span>
                  <strong>{revision.tipoEquipo}</strong>
                  <br />
                  Laboratorio: {revision.laboratorio}
                  <br />
                  Fecha: {revision.fecha}
                  <br />
                  Responsable: {revision.responsable}
                </span>

                <button
                  type="button"
                  className="section-page__button"
                  onClick={() => eliminarRevision(revision.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalAbierto && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalAbierto(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 1000,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-mantenimiento"
            style={{
              width: "100%",
              maxWidth: "520px",
              padding: "2rem",
              borderRadius: "20px",
              background: "#0f172a",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h2 id="titulo-modal-mantenimiento">
              Programar revisión preventiva
            </h2>
            <p style={{ color: "#cbd5e1" }}>
              Registra una revisión para mantener los equipos en buenas condiciones.
            </p>

            <form onSubmit={registrarRevision}>
              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="laboratorio-mantenimiento">Laboratorio</label>
                <select
                  id="laboratorio-mantenimiento"
                  value={laboratorio}
                  onChange={(event) => setLaboratorio(event.target.value)}
                  required
                >
                  {laboratorios.map((nombre) => (
                    <option key={nombre} value={nombre}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="tipo-equipo-mantenimiento">Tipo de equipo</label>
                <select
                  id="tipo-equipo-mantenimiento"
                  value={tipoEquipo}
                  onChange={(event) => setTipoEquipo(event.target.value)}
                  required
                >
                  {tiposEquipo.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="fecha-mantenimiento">Fecha de revisión</label>
                <input
                  id="fecha-mantenimiento"
                  type="date"
                  value={fecha}
                  onChange={(event) => setFecha(event.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="responsable-mantenimiento">Responsable</label>
                <input
                  id="responsable-mantenimiento"
                  type="text"
                  value={responsable}
                  onChange={(event) => setResponsable(event.target.value)}
                  placeholder="Nombre del responsable"
                  required
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  type="button"
                  className="section-page__button"
                  onClick={() => setModalAbierto(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="section-page__button">
                  Programar revisión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionPage>
  );
}

export default MaintenancePage;
