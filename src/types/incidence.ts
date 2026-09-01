export const laboratories = ["Primaria", "Diseño gráfico", "Sistemas", "Química"] as const;
export const incidenceStatuses = ["Pendiente", "En revisión", "Resuelta"] as const;

export interface Incidence {
  id: string;
  laboratory: string;
  equipmentType: string;
  equipmentCode: string;
  incidenceType: string;
  detail: string;
  status: string;
  registeredAt: string;
  registeredBy: string;
}

export type IncidenceFormData = Omit<Incidence, "id" | "registeredAt" | "registeredBy">;
