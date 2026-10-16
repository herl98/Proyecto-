import { useState, type FormEvent } from "react";
import SectionPage from "../components/layout/SectionPage";
import { authRepository } from "../repositories/authRepository";
import type { UserRecord, UserRole } from "../types/auth";

const roleLabels: Record<UserRole, string> = {
  ADMIN_COLEGIO: "Administrador del colegio",
  DOCENTE: "Docente responsable",
  ADMIN_SISTEMA: "Administrador del sistema",
};

function UsersAdminPage() {
  const [users, setUsers] = useState(() => authRepository.getUsers());
  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("DOCENTE");
  const [message, setMessage] = useState("");

  const createUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      carnet: carnet.trim(),
      password,
      role,
    };
    if (!authRepository.createUser(newUser)) {
      setMessage("Ese carnet ya está registrado.");
      return;
    }
    setUsers(authRepository.getUsers());
    setName("");
    setCarnet("");
    setPassword("");
    setMessage("Usuario agregado correctamente a esta demostración.");
  };

  const deleteUser = (id: string) => {
    const currentUser = authRepository.getCurrentUser();
    if (currentUser?.id === id) {
      setMessage("No puedes eliminar la cuenta con la que iniciaste sesión.");
      return;
    }
    authRepository.deleteUser(id);
    setUsers(authRepository.getUsers());
    setMessage("Usuario eliminado.");
  };

  return (
    <SectionPage eyebrow="Administración" title="Gestionar usuarios" description="Registra cuentas de acceso y asigna el rol que corresponde a cada persona.">
      <form onSubmit={createUser} style={{ display: "grid", gap: "0.9rem", maxWidth: "620px", marginBottom: "2rem" }}>
        <label>Nombre completo<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>Carnet o usuario<input value={carnet} onChange={(event) => setCarnet(event.target.value)} required /></label>
        <label>Contraseña inicial<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /></label>
        <label>Rol<select value={role} onChange={(event) => setRole(event.target.value as UserRole)}><option value="ADMIN_COLEGIO">Administrador del colegio</option><option value="DOCENTE">Docente responsable</option><option value="ADMIN_SISTEMA">Administrador del sistema</option></select></label>
        <button className="section-page__button" type="submit">Crear usuario</button>
        {message && <p role="status">{message}</p>}
      </form>
      <h2>Cuentas registradas</h2>
      <div className="section-page__list">
        {users.map((user) => <div className="section-page__list-item" key={user.id}>
          <span><strong>{user.name}</strong><br />{user.carnet}<br />{roleLabels[user.role]}</span>
          <button type="button" className="section-page__button" onClick={() => deleteUser(user.id)}>Eliminar</button>
        </div>)}
      </div>
    </SectionPage>
  );
}
export default UsersAdminPage;
