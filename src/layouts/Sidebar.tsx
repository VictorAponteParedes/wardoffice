// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Mic2,
  Calendar,
  Church,
  Settings,
  LogOut,
  ChevronDown,
  UserCheck,
  ClipboardList,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../store/authStore";
import { translate } from "../lang";
import { RoutesView } from "../navigation/routes";
import backLogo from "../assets/images/logoBack.png";


type SidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const { logout } = useAuth();
  const location = useLocation();

  // State for expanded menus
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const handleLogout = () => {
    logout();
    window.location.href = RoutesView.login;
  };

  const isActive = (path: string) => location.pathname === path;
  const isChildActive = (paths: string[]) => paths.some(path => location.pathname === path);

  const MenuItem = ({
    icon: Icon,
    label,
    to,
    children,
    id
  }: {
    icon: any,
    label: string,
    to?: string,
    children?: React.ReactNode,
    id?: string
  }) => {
    const hasChildren = !!children;
    const isExpanded = id ? expandedMenus.includes(id) : false;
    const active = to ? isActive(to) : (id && children ? isChildActive([]) : false); // Simplified active check for parents

    if (hasChildren && id) {
      return (
        <div className="mb-1">
          <button
            onClick={() => toggleMenu(id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isExpanded ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${isExpanded ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
              <span className="font-medium text-sm">{label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-1 space-y-1">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        to={to!}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 group ${active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
      >
        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-blue-400'}`} />
        <span className="font-medium text-sm">{label}</span>
      </Link>
    );
  };

  const SubMenuItem = ({ label, to }: { label: string, to: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 pl-12 pr-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${isActive(to)
        ? 'text-blue-400 bg-blue-400/10 font-medium'
        : 'text-gray-500 hover:text-gray-300'
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive(to) ? 'bg-blue-400' : 'bg-gray-600'}`} />
      {label}
    </Link>
  );

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-72"
        } bg-[#1e212a] text-white shadow-xl sticky top-0 h-screen flex flex-col transition-all duration-300 ease-in-out z-50`}
    >
      {/* Logo Area */}
      {/* Logo Area - Fondo blanco con logo oficial encima del texto */}
      <div className=" rounded-2xl mx-4 mt-4 mb-6 shadow-lg overflow-hidden">
        <div className="flex flex-col items-center py-8 px-6">

          {/* Logo oficial (siempre visible) */}
          {/* <img
            src={backLogo}
            alt="La Iglesia de Jesucristo de los Santos de los Últimos Días"
            className={`${isCollapsed ? "w-16" : "w-28"} h-auto transition-all duration-300`}
          /> */}

          {/* Texto solo cuando está expandido */}
          {!isCollapsed && (
            <div className="mt-5 text-center">
              <h1 className="text-2xl font-bold text-white leading-tight">
                Portal del Barrio
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <nav className="space-y-1">
          <MenuItem
            icon={LayoutDashboard}
            label={translate("Sidebar.dashboard")}
            to={RoutesView.dashboard}
          />

          <MenuItem
            icon={Users}
            label={translate("Sidebar.members")}
            id="members"
          >
            <SubMenuItem label={translate("Sidebar.membersAll")} to={RoutesView.memberList} />
            <SubMenuItem label={translate("Sidebar.attendance")} to={RoutesView.attendance} />
          </MenuItem>

          <MenuItem
            icon={Mic2}
            label={translate("Sidebar.talks")}
            id="talks"
          >
            <SubMenuItem label={translate("Sidebar.talksSchedule")} to={RoutesView.speech} />
            <SubMenuItem label={translate("Sidebar.assignTalk")} to={RoutesView.assignTalk} />
            <SubMenuItem label="Temas" to={RoutesView.topics} />
          </MenuItem>

          <MenuItem
            icon={ClipboardList}
            label={translate("Sidebar.agenda")}
            to={RoutesView.agenda}
          />

          <MenuItem
            icon={UserCheck}
            label={translate("Sidebar.callings")}
            to={RoutesView.callings}
          />

          <MenuItem
            icon={Calendar}
            label={translate("Sidebar.events")}
            to={RoutesView.events}
          />

          <div className="my-4 border-t border-gray-800" />

          <MenuItem
            icon={Settings}
            label={translate("Sidebar.settings")}
            to={RoutesView.settings}
          />
        </nav>
      </div>

      {/* Account Section */}
      <div className="p-4 border-t border-gray-800">
        <MenuItem
          icon={User}
          label="Account"
          id="account"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 pl-12 pr-4 py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {translate("Sidebar.signOut")}
          </button>
        </MenuItem>
      </div>
    </aside>
  );
}
