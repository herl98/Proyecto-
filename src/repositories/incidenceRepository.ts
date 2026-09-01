import { storageService } from "../services/storageService";
import type { Incidence, IncidenceFormData } from "../types/incidence";

const INCIDENCES_KEY = "laboratory_incidences";

export const incidenceRepository = {
  getAll(): Incidence[] {
    return storageService.get<Incidence[]>(INCIDENCES_KEY) ?? [];
  },

  create(data: IncidenceFormData, registeredBy: string): Incidence {
    const incidence: Incidence = {
      ...data,
      id: crypto.randomUUID(),
      registeredAt: new Date().toISOString(),
      registeredBy,
    };
    const incidences = [incidence, ...this.getAll()];
    storageService.set(INCIDENCES_KEY, incidences);
    return incidence;
  },

  update(id: string, data: IncidenceFormData): Incidence | null {
    const incidences = this.getAll();
    const current = incidences.find((incidence) => incidence.id === id);
    if (!current) return null;

    const updated = { ...current, ...data };
    storageService.set(INCIDENCES_KEY, incidences.map((incidence) => incidence.id === id ? updated : incidence));
    return updated;
  },
};
