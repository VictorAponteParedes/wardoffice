import { Bell, Search, MoreVertical } from "lucide-react";
import { useAuth } from "../store/authStore";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            {/* Left side - Page Title or Breadcrumbs (Optional, currently empty based on image) */}
            <div className="flex-1">
                {/* Placeholder for future breadcrumbs or title */}
            </div>

            {/* Right side - Actions & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
                    <Search className="w-5 h-5" />
                </button>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                        {user?.name || "User"} {user?.lastName || ""}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
