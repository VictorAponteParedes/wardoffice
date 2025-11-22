import React from "react";

interface CallingsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const CallingsTabs = ({ activeTab, onTabChange }: CallingsTabsProps) => {
    const tabs = [
        { id: "all", label: "Todos" },
        { id: "filled", label: "Ocupados" },
        { id: "vacant", label: "Vacantes" },
    ];

    return (
        <div className="flex gap-6 border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    );
};
