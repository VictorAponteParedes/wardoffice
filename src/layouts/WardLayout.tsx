// src/layouts/WardLayout.tsx
import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";

type Props = { children: ReactNode };

export default function WardLayout({ children }: Props) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 font-poppins">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden">
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

                <div className="relative z-10 p-6 lg:p-10">{children}</div>
            </main>
        </div>
    );
}