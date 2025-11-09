// src/components/layout/Sidebar.tsx
import { Link } from "react-router-dom";
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
  ChevronRight,
  ChevronLeft,
  Sparkles,
  UserCheck,
  ClipboardList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../store/authStore";
import { translate } from "../lang";
import { RoutesView } from "../navigation/routes";

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
  agenda: "/agenda",
};

type SidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { logout, user } = useAuth();
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isTalksOpen, setIsTalksOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = Routes.login;
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-80"
      } bg-primary text-white shadow-2xl sticky top-0 h-screen flex flex-col justify-between transition-all duration-500 ease-in-out overflow-hidden`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-12 bg-white/20 backdrop-blur-md rounded-full p-1.5 shadow-lg hover:bg-white/30 transition-all z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* ================== EXPANDIDO ================== */}
      {!isCollapsed && (
        <div className="p-6 space-y-8">
          {/* Logo + Título */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Church className="w-10 h-10 text-yellow-300" />
              <Sparkles className="w-8 h-8 text-yellow-200 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">
              {translate("Sidebar.title")}
            </h1>
            <p className="text-sm opacity-90 mt-1">
              {user?.ward || translate("Sidebar.wardPlaceholder")}
            </p>
          </div>

          {/* Navegación */}
          <nav className="space-y-6">
            {/* Dashboard */}
            <Link
              to={Routes.dashboard}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">
                {translate("Sidebar.dashboard")}
              </span>
            </Link>

            {/* Miembros */}
            <button
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="font-medium">
                  {translate("Sidebar.members")}
                </span>
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
                  <Link
                    to={RoutesView.memberList}
                    className="block py-2 text-sm hover:text-yellow-300"
                  >
                    {translate("Sidebar.membersAll")}
                  </Link>
                  <Link
                    to={Routes.attendance}
                    className="block py-2 text-sm hover:text-yellow-300"
                  >
                    {translate("Sidebar.attendance")}
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
                <span className="font-medium">
                  {translate("Sidebar.talks")}
                </span>
              </div>
              <motion.div animate={{ rotate: isTalksOpen ? 180 : 0 }}>
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
                  <Link
                    to={Routes.talks}
                    className="block py-2 text-sm hover:text-yellow-300"
                  >
                    {translate("Sidebar.talksSchedule")}
                  </Link>
                  <Link
                    to={Routes.assignTalk}
                    className="block py-2 text-sm hover:text-yellow-300 flex items-center gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    {translate("Sidebar.assignTalk")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              to={RoutesView.agenda}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="font-medium">{translate("Sidebar.agenda")}</span>
            </Link>

            {/* Otros ítems */}
            <Link
              to={RoutesView.callings}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <UserCheck className="w-5 h-5" />
              <span className="font-medium">
                {translate("Sidebar.callings")}
              </span>
            </Link>

            <Link
              to={Routes.events}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{translate("Sidebar.events")}</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/20 pt-6">
            <Link
              to={Routes.settings}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              <Settings className="w-5 h-5" />
              {translate("Sidebar.settings")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all mt-2"
            >
              <LogOut className="w-5 h-5" />
              {translate("Sidebar.signOut")}
            </button>
          </div>
        </div>
      )}

      {/* ================== COLAPSADO (ICONOS) ================== */}
      {isCollapsed && (
        <div className="flex flex-col items-center justify-between h-full py-8">
          <div className="space-y-8">
            <Church className="w-8 h-8 text-yellow-300" />
            <nav className="space-y-6">
              <Link
                to={Routes.dashboard}
                title={translate("Sidebar.dashboard")}
              >
                <LayoutDashboard className="w-6 h-6 hover:text-yellow-300" />
              </Link>
              <Link
                to={RoutesView.memberList}
                title={translate("Sidebar.members")}
              >
                <Users className="w-6 h-6 hover:text-yellow-300" />
              </Link>
              <Link
                to={Routes.assignTalk}
                title={translate("Sidebar.assignTalk")}
              >
                <Shuffle className="w-6 h-6 hover:text-yellow-300" />
              </Link>
              <Link to={Routes.callings} title={translate("Sidebar.callings")}>
                <UserCheck className="w-6 h-6 hover:text-yellow-300" />
              </Link>
              <Link to={Routes.events} title={translate("Sidebar.events")}>
                <Calendar className="w-6 h-6 hover:text-yellow-300" />
              </Link>
            </nav>
          </div>
          <button onClick={handleLogout} title={translate("Sidebar.signOut")}>
            <LogOut className="w-6 h-6 text-red-300 hover:text-red-400" />
          </button>
        </div>
      )}
    </aside>
  );
}
