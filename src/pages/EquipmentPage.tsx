import SectionPage from "../components/layout/SectionPage";

const equipment = [
  { name: "Microscopios", quantity: 18, location: "Biología", status: "Disponible" },
  { name: "Kits de química", quantity: 12, location: "Química", status: "Disponible" },
  { name: "Balanzas digitales", quantity: 6, location: "Química", status: "Disponible" },
  { name: "Fuentes de alimentación", quantity: 5, location: "Física", status: "Disponible" },
  { name: "Mecheros", quantity: 10, location: "Química", status: "Disponible" },
];

function EquipmentPage() {
  return (
    <SectionPage
      eyebrow="Inventario"
      title="Equipos de laboratorio"
      description="Consulta y controla los recursos disponibles para cada práctica."
    >
      <div className="section-page__grid">
        <article className="section-page__card">
          <strong>18</strong>
          <span>Microscopios disponibles</span>
        </article>
        <article className="section-page__card">
          <strong>12</strong>
          <span>Kits de química listos</span>
        </article>
        <article className="section-page__card">
          <strong>4</strong>
          <span>Equipos en revisión</span>
        </article>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Inventario por área</h2>
        <div className="section-page__list">
          {equipment.map((item) => (
            <div className="section-page__list-item" key={item.name}>
              <span>
                <strong>{item.name}</strong> — {item.quantity} unidades
              </span>
              <small>{item.location} · {item.status}</small>
            </div>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}

export default EquipmentPage;
