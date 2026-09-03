import { FormEvent, useState } from "react";
import SectionPage from "../components/layout/SectionPage";

type RegistroDano = {
  id: number;
  laboratorio: string;
  tipoEquipo: string;
  codigo: string;
  cantidadDaniada: number;
};

const laboratorios = [
  "Primaria",
  "Diseño Gráfico",
  "Sistemas",
  "Química",
];

const tiposEquipo = [
  "Computadora",
  "Microscopio",
  "Proyector",
  "Impresora",
  "Balanzas",
  "Material de laboratorio",
  "Otro",
];

function EquipmentPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registros, setRegistros] = useState<RegistroDano[]>([]);

  const [laboratorio, setLaboratorio] = useState("Primaria");
  const [tipoEquipo, setTipoEquipo] = useState("Computadora");
  const [codigo, setCodigo] = useState("");
  const [cantidadDaniada, setCantidadDaniada] = useState(1);

  const registrarEquipoDaniado = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevoRegistro: RegistroDano = {
      id: Date.now(),
      laboratorio,
      tipoEquipo,
      codigo: codigo.trim(),
      cantidadDaniada,
    };

    setRegistros((actuales) => [nuevoRegistro, ...actuales]);
    setCodigo("");
    setCantidadDaniada(1);
    setModalAbierto(false);
  };

  const eliminarRegistro = (id: number) => {
    setRegistros((actuales) =>
      actuales.filter((registro) => registro.id !== id)
    );
  };

  return (
    <SectionPage
      eyebrow="Inventario"
      title="Equipos de laboratorio"
      description="Controla los equipos y registra aquellos que se encuentren dañados en cada laboratorio."
    >
      <div className="section-page__grid">
        <article className="section-page__card">
          <strong>{registros.length}</strong>
          <span>Registros de equipos dañados</span>
        </article>

        <article className="section-page__card">
          <strong>
            {registros.reduce(
              (total, registro) => total + registro.cantidadDaniada,
              0
            )}
          </strong>
          <span>Total de equipos dañados</span>
        </article>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          type="button"
          className="section-page__button"
          onClick={() => setModalAbierto(true)}
        >
          Registrar equipo dañado
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Equipos dañados registrados</h2>

        {registros.length === 0 ? (
          <p style={{ color: "#cbd5e1" }}>
            No existen equipos dañados registrados.
          </p>
        ) : (
          <div className="section-page__list" style={{ marginTop: "1rem" }}>
            {registros.map((registro) => (
              <div
                className="section-page__list-item"
                key={registro.id}
              >
                <span>
                  <strong>{registro.tipoEquipo}</strong>
                  <br />
                  Laboratorio: {registro.laboratorio}
                  <br />
                  Código: {registro.codigo}
                  <br />
                  Cantidad dañada: {registro.cantidadDaniada}
                </span>

                <button
                  type="button"
                  className="section-page__button"
                  onClick={() => eliminarRegistro(registro.id)}
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
            aria-labelledby="titulo-modal-equipo"
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
            <h2 id="titulo-modal-equipo">Registrar equipo dañado</h2>
            <p style={{ color: "#cbd5e1" }}>
              Completa los datos del equipo que presenta daños.
            </p>

            <form onSubmit={registrarEquipoDaniado}>
              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="laboratorio">Laboratorio</label>
                <select
                  id="laboratorio"
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
                <label htmlFor="tipo-equipo">Tipo de equipo</label>
                <select
                  id="tipo-equipo"
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
                <label htmlFor="codigo-equipo">Código del equipo</label>
                <input
                  id="codigo-equipo"
                  type="text"
                  value={codigo}
                  onChange={(event) => setCodigo(event.target.value)}
                  placeholder="Ej. EQ-SIS-001"
                  required
                />
              </div>

              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                <label htmlFor="cantidad-daniada">
                  Cantidad de equipos dañados
                </label>
                <input
                  id="cantidad-daniada"
                  type="number"
                  min="1"
                  value={cantidadDaniada}
                  onChange={(event) =>
                    setCantidadDaniada(Number(event.target.value))
                  }
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

                <button
                  type="submit"
                  className="section-page__button"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionPage>
  );
}

export default EquipmentPage;
