// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// === PÁGINAS PÚBLICAS ===
import LoginPage from "../screens/auth/login";


export default function AppRoutes() {
    return (
        <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<div className="p-10 text-center text-4xl">404 - Page not found</div>} />
        </Routes>
    );
}