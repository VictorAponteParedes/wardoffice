// src/layouts/WardLayout.tsx
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Mic2,
    Shuffle,
    Calendar,
    Church,
    Settings,
    LogOut,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    UserCheck,
    Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../store/authStore";

// Rutas (ajústalas después)
const Routes = {
    dashboard: "/dashboard",
    members: "/members",
    talks: "/talks",
    assignTalk: "/talks/assign",
    callings: "/callings",
    attendance: "/attendance",
    events: "/events",
    settings: "/settings",
    login: "/login",
};

type Props = { children: ReactNode };

export default function WardLayout({ children }: Props) {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isMembersOpen, setIsMembersOpen] = useState(false);
    const [isTalksOpen, setIsTalksOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate(Routes.login);
    };

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 font-poppins">
            {/* ===================== SIDEBAR ===================== */}
            <aside
                className={`${isSidebarCollapsed ? "w-20" : "w-80"
                    } bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-2xl sticky top-0 h-screen flex flex-col justify-between transition-all duration-500 ease-in-out overflow-hidden`}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-12 bg-white/20 backdrop-blur-md rounded-full p-1.5 shadow-lg hover:bg-white/30 transition-all z-50"
                >
                    {isSidebarCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <ChevronLeft className="w-5 h-5" />
                    )}
                </button>

                {/* Contenido Expandido */}
                {!isSidebarCollapsed && (
                    <div className="p-6 space-y-8">
                        {/* Logo + Título */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <Church className="w-10 h-10 text-yellow-300" />
                                <Sparkles className="w-8 h-8 text-yellow-200 animate-pulse" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-wide">Ward BackOffice</h1>
                            <p className="text-sm opacity-90 mt-1">
                                {user?.ward || "Provo 5th Ward"}
                            </p>
                        </div>

                        {/* Navegación Principal */}
                        <nav className="space-y-6">
                            {/* Dashboard */}
                            <Link
                                to={Routes.dashboard}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </Link>

                            {/* Miembros */}
                            <button
                                onClick={() => setIsMembersOpen(!isMembersOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium">Members</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: isMembersOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {isMembersOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-12 space-y-2"
                                    >
                                        <Link to={Routes.members} className="block py-2 text-sm hover:text-yellow-300">
                                            → All Members
                                        </Link>
                                        <Link to={Routes.attendance} className="block py-2 text-sm hover:text-yellow-300">
                                            → Attendance
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Discursos */}
                            <button
                                onClick={() => setIsTalksOpen(!isTalksOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <Mic2 className="w-5 h-5" />
                                    <span className="font-medium">Talks</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: isTalksOpen ? 180 : 0 }}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {isTalksOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-12 space-y-2"
                                    >
                                        <Link to={Routes.talks} className="block py-2 text-sm hover:text-yellow-300">
                                            → Schedule
                                        </Link>
                                        <Link to={Routes.assignTalk} className="block py-2 text-sm hover:text-yellow-300 flex items-center gap-2">
                                            <Shuffle className="w-4 h-4" />
                                            Random Assignment
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Callings & Events */}
                            <Link
                                to={Routes.callings}
                                className="flex items-center gap-3 px-4 py-3 rounded және hover:bg-white/10 transition-all"
                            >
                                <UserCheck className="w-5 h-5" />
                                <span className="font-medium">Callings</span>
                            </Link>

                            <Link
                                to={Routes.events}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Events</span>
                            </Link>
                        </nav>

                        {/* Footer Sidebar */}
                        <div className="border-t border-white/20 pt-6">
                            <Link
                                to={Routes.settings}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-sm"
                            >
                                <Settings className="w-5 h-5" />
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all mt-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}

                {/* Contenido Colapsado (solo íconos) */}
                {isSidebarCollapsed && (
                    <div className="flex flex-col items-center justify-between h-full py-8">
                        <div className="space-y-8">
                            <Church className="w-8 h-8 text-yellow-300" />
                            <nav className="space-y-6">
                                <Link to={Routes.dashboard} title="Dashboard">
                                    <LayoutDashboard className="w-6 h-6 hover:text-yellow-300" />
                                </Link>
                                <Link to={Routes.members} title="Members">
                                    <Users className="w-6 h-6 hover:text-yellow-300" />
                                </Link>
                                <Link to={Routes.assignTalk} title="Assign Talk">
                                    <Shuffle className="w-6 h-6 hover:text-yellow-300" />
                                </Link>
                                <Link to={Routes.callings} title="Callings">
                                    <UserCheck className="w-6 h-6 hover:text-yellow-300" />
                                </Link>
                                <Link to={Routes.events} title="Events">
                                    <Calendar className="w-6 h-6 hover:text-yellow-300" />
                                </Link>
                            </nav>
                        </div>
                        <button onClick={handleLogout} title="Sign Out">
                            <LogOut className="w-6 h-6 text-red-300 hover:text-red-400" />
                        </button>
                    </div>
                )}
            </aside>

            {/* ===================== MAIN CONTENT ===================== */}
            <main className="flex-1 relative overflow-hidden">
                {/* Fondo sutil con templo */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage: `url(/images/temploFondo.jfif)`,
                            filter: "brightness(1.1)",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-blue-50/80" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}