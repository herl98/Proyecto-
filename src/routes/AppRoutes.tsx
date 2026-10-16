import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import EquipmentPage from "../pages/EquipmentPage";
import IncidentsPage from "../pages/IncidentsPage";
import MaintenancePage from "../pages/MaintenancePage";
import UserPage from "../pages/UserPage";
import { authRepository } from "../repositories/authRepository";
import "./AppRoute.css";

function AppRoutes() {
  const authenticated = authRepository.isAuthenticated();

  return (
    <BrowserRouter>
      <div className="app-routes">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/inicio"
            element={authenticated ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/equipos"
            element={authenticated ? <EquipmentPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/incidencias"
            element={authenticated ? <IncidentsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/mantenimiento"
            element={authenticated ? <MaintenancePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/usuario"
            element={authenticated ? <UserPage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
