import { useState, type FormEvent } from "react";

import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import { incidenceRepository } from "../repositories/incidenceRepository";
import { incidenceStatuses, laboratories, type Incidence, type IncidenceFormData } from "../types/incidence";
import "./IncidentsPage.css";

const emptyForm: IncidenceFormData = { laboratory: "", equipmentType: "", equipmentCode: "", incidenceType: "", detail: "", status: "Pendiente" };

function IncidentsPage() {
  const [incidences, setIncidences] = useState(() => incidenceRepository.getAll());
  const [editingIncidence, setEditingIncidence] = useState<Incidence | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState<IncidenceFormData>(emptyForm);

  const openRegisterModal = () => { setForm(emptyForm); setEditingIncidence(null); setIsRegistering(true); };
  const openEditModal = (incidence: Incidence) => {
    setForm({
      laboratory: incidence.laboratory,
      equipmentType: incidence.equipmentType,
      equipmentCode: incidence.equipmentCode,
      incidenceType: incidence.incidenceType,
      detail: incidence.detail,
      status: incidence.status,
    });
    setEditingIncidence(incidence); setIsRegistering(true);
  };
  const closeModal = () => setIsRegistering(false);
  const updateField = (field: keyof IncidenceFormData, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const saveIncidence = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingIncidence) incidenceRepository.update(editingIncidence.id, form);
    else incidenceRepository.create(form, authRepository.getCurrentUser()?.name ?? "Usuario no identificado");
    setIncidences(incidenceRepository.getAll()); closeModal();
  };

  return <SectionPage eyebrow="Seguimiento" title="Reporte de incidencias" description="Registra novedades para mantener cada ambiente seguro y en buenas condiciones.">
    <div className="incidents-page__toolbar"><button className="section-page__button" type="button" onClick={openRegisterModal}>Registrar incidencia</button></div>
    {incidences.length === 0 ? <p className="incidents-page__empty">Aún no hay incidencias registradas.</p> : <div className="incidents-page__list">
      {incidences.map((incidence) => <article className="incidents-page__item" key={incidence.id}>
        <div className="incidents-page__item-header"><h2>{incidence.incidenceType} · {incidence.equipmentType}</h2><span className="incidents-page__status">{incidence.status}</span></div>
        <p>{incidence.detail}</p>
        <div className="incidents-page__item-footer"><span>{incidence.laboratory}{incidence.equipmentCode ? ` · Código: ${incidence.equipmentCode}` : ""}<br />Registrada el {new Intl.DateTimeFormat("es-BO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(incidence.registeredAt))} por {incidence.registeredBy}</span><button className="incidents-page__edit" type="button" onClick={() => openEditModal(incidence)}>Editar</button></div>
      </article>)}
    </div>}
    {isRegistering && <div className="incidents-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}><section className="incidents-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="incidents-modal-title">
      <div className="incidents-modal__header"><h2 id="incidents-modal-title">{editingIncidence ? "Editar incidencia" : "Registrar incidencia"}</h2><button className="incidents-modal__close" type="button" onClick={closeModal} aria-label="Cerrar">×</button></div>
      <form className="incidents-form" onSubmit={saveIncidence}>
        <div className="incidents-form__grid"><label>Laboratorio<select value={form.laboratory} onChange={(event) => updateField("laboratory", event.target.value)} required><option value="">Selecciona un laboratorio</option>{laboratories.map((laboratory) => <option key={laboratory}>{laboratory}</option>)}</select></label><label>Tipo de equipo<input value={form.equipmentType} onChange={(event) => updateField("equipmentType", event.target.value)} required /></label></div>
        <div className="incidents-form__grid"><label>Código de equipo <small>(opcional)</small><input value={form.equipmentCode} onChange={(event) => updateField("equipmentCode", event.target.value)} /></label><label>Tipo de incidencia<input value={form.incidenceType} onChange={(event) => updateField("incidenceType", event.target.value)} required /></label></div>
        <label>Detalle<textarea value={form.detail} onChange={(event) => updateField("detail", event.target.value)} required /></label>
        <label>Estado<select value={form.status} onChange={(event) => updateField("status", event.target.value)} required>{incidenceStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <div className="incidents-form__actions"><button className="incidents-form__cancel" type="button" onClick={closeModal}>Cancelar</button><button className="section-page__button" type="submit">{editingIncidence ? "Guardar cambios" : "Registrar incidencia"}</button></div>
      </form>
    </section></div>}
  </SectionPage>;
}

export default IncidentsPage;
