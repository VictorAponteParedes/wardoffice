// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoutesView } from "../navigation/routes";

// === PÁGINAS PÚBLICAS ===
import LoginPage from "../screens/auth/login";
import NotFound from "../screens/errors";

// === PÁGINAS PRIVADAS (protegidas) ===
import Dashboard from "../screens/dashboard";
import MembersList from "../screens/members/MembersList";
import CreateMember from "../screens/members/CreateMember";
import Agenda from "../screens/agenda";
import Speech from "../screens/speech";

export default function AppRoutes() {
  return (
    <Routes>
      {/* RUTA PÚBLICA: Login */}
      <Route path={RoutesView.login} element={<LoginPage />} />

      {/* RUTA PROTEGIDA */}
      <Route
        path={RoutesView.dashboard}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutesView.memberList}
        element={
          <ProtectedRoute>
            <MembersList />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutesView.memberCreate}
        element={
          <ProtectedRoute>
            <CreateMember />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutesView.agenda}
        element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutesView.speech}
        element={
          <ProtectedRoute>
            <Speech />
          </ProtectedRoute>
        }
      />

      {/* REDIRECCIÓN POR DEFECTO */}
      <Route
        path="/"
        element={<Navigate to={RoutesView.dashboard} replace />}
      />

      {/* 404 → TU VISTA SUD HERMOSA */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
