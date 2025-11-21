// src/navigation/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesView } from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../screens/auth/login/index"
import NotFound from "../screens/errors/index";


import { MEMBER_ROUTES } from "../screens/members/routes";
import { DASHBOARD_ROUTES } from "../screens/dashboard/routes";
import { AGENDA_ROUTES } from "../screens/agenda/routes";
import { SPEECH_ROUTES } from "../screens/speech/routes";

// Todas las rutas privadas (con lazy + ProtectedRoute automático)
const PRIVATE_ROUTES = [
  ...DASHBOARD_ROUTES,
  ...MEMBER_ROUTES,
  ...AGENDA_ROUTES,
  ...SPEECH_ROUTES,
  // + todos los que vayas creando
];

export default function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path={RoutesView.login} element={<LoginPage />} />
      <Route path="/" element={<Navigate to={RoutesView.dashboard} replace />} />
      <Route path="*" element={<NotFound />} />

      {/* TODAS LAS RUTAS PRIVADAS (lazy + protegidas en un solo lugar) */}
      {PRIVATE_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
}