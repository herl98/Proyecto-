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

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authRepository.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app-routes">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/inicio"
            element={<ProtectedRoute><HomePage /></ProtectedRoute>}
          />
          <Route
            path="/equipos"
            element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>}
          />
          <Route
            path="/incidencias"
            element={<ProtectedRoute><IncidentsPage /></ProtectedRoute>}
          />
          <Route
            path="/mantenimiento"
            element={<ProtectedRoute><MaintenancePage /></ProtectedRoute>}
          />
          <Route
            path="/usuario"
            element={<ProtectedRoute><UserPage /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
