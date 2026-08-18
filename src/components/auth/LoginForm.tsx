import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";


interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}


function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();


    const normalizedCarnet = carnet.trim();


    if (!normalizedCarnet || !password) {
      return;
    }


    onSubmit({
      carnet: normalizedCarnet,
      password,
    });
  };


  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <span className="login-form__eyebrow">Acceso seguro</span>
        <h1>Iniciar sesión</h1>
        <p className="login-form__subtitle">
          Ingresa al sistema de cuidado y control de laboratorios Don Bosco Sucre.
        </p>
      </div>


      <div className="login-group">
        <label htmlFor="carnet">Carnet de identidad</label>


        <input
          id="carnet"
          name="carnet"
          type="text"
          value={carnet}
          onChange={(event) => setCarnet(event.target.value)}
          placeholder="Ingrese su carnet"
          autoComplete="username"
          required
        />
      </div>


      <div className="login-group">
        <label htmlFor="password">Contraseña</label>


        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingrese su contraseña"
          autoComplete="current-password"
          required
        />
      </div>


      {error && (
        <p className="login-error" role="alert" aria-live="polite">
          {error}
        </p>
      )}


      <button type="submit">Ingresar</button>

      <p className="login-form__footer">
        Plataforma orientada al registro responsable, seguridad y conservación de los laboratorios.
      </p>
    </form>
  );
}


export default LoginForm;
