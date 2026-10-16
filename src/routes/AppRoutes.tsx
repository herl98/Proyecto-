import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import EquipmentPage from "../pages/EquipmentPage";
import IncidentsPage from "../pages/IncidentsPage";
import MaintenancePage from "../pages/MaintenancePage";
import UserPage from "../pages/UserPage";
import InventoryPage from "../pages/InventoryPage";
import UsersAdminPage from "../pages/UsersAdminPage";
import { authRepository } from "../repositories/authRepository";
import type { UserRole } from "../types/auth";
import "./AppRoute.css";

type ProtectedRouteProps = { children: ReactNode; allowedRoles: UserRole[] };

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const user = authRepository.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/inicio" replace />;
  return <>{children}</>;
}

const schoolAdmin: UserRole[] = ["ADMIN_COLEGIO"];
const teacher: UserRole[] = ["DOCENTE"];
const systemAdmin: UserRole[] = ["ADMIN_SISTEMA"];
const allRoles: UserRole[] = [...schoolAdmin, ...teacher, ...systemAdmin];

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app-routes">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inicio" element={<ProtectedRoute allowedRoles={allRoles}><HomePage /></ProtectedRoute>} />
          <Route path="/equipos" element={<ProtectedRoute allowedRoles={allRoles}><EquipmentPage /></ProtectedRoute>} />
          <Route path="/inventario" element={<ProtectedRoute allowedRoles={[...schoolAdmin, ...systemAdmin]}><InventoryPage /></ProtectedRoute>} />
          <Route path="/incidencias" element={<ProtectedRoute allowedRoles={allRoles}><IncidentsPage /></ProtectedRoute>} />
          <Route path="/mantenimiento" element={<ProtectedRoute allowedRoles={[...schoolAdmin, ...teacher, ...systemAdmin]}><MaintenancePage /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute allowedRoles={systemAdmin}><UsersAdminPage /></ProtectedRoute>} />
          <Route path="/usuario" element={<ProtectedRoute allowedRoles={allRoles}><UserPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default AppRoutes;
