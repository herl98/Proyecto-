import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import EquipmentPage from "../pages/EquipmentPage";
import IncidentsPage from "../pages/IncidentsPage";
import MaintenancePage from "../pages/MaintenancePage";
import UserPage from "../pages/UserPage";
import "./AppRoute.css";


function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app-routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/equipos" element={<EquipmentPage />} />
          <Route path="/incidencias" element={<IncidentsPage />} />
          <Route path="/mantenimiento" element={<MaintenancePage />} />
          <Route path="/usuario" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default AppRoutes;
