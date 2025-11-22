// src/layouts/WardLayout.tsx
import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = { children: ReactNode };

export default function WardLayout({ children }: Props) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#f5f6fa] font-poppins overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <Header />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}