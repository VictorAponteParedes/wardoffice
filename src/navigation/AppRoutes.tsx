// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoutesView } from "../navigation/routes";

// === PÁGINAS PÚBLICAS ===
import LoginPage from "../screens/auth/login";
import NotFound from "../screens/errors";

// === PÁGINAS PRIVADAS (protegidas) ===
import Dashboard from "../screens/dashboard";

export default function AppRoutes() {
    return (
        <Routes>
            {/* RUTA PÚBLICA: Login */}
            <Route path={RoutesView.login} element={<LoginPage />} />

            {/* RUTA PROTEGIDA: Dashboard */}
            <Route
                path={RoutesView.dashboard}
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* REDIRECCIÓN POR DEFECTO */}
            <Route path="/" element={<Navigate to={RoutesView.dashboard} replace />} />

            {/* 404 → TU VISTA SUD HERMOSA */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}