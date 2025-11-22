import React from "react";
import { motion } from "framer-motion";

interface SpeechTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const SpeechTabs: React.FC<SpeechTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: "all", label: "Todos" },
        { id: "upcoming", label: "Próximos" },
        { id: "past", label: "Pasados" },
    ];

    return (
        <div className="flex space-x-1 bg-transparent">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative px-6 py-3 text-sm font-medium transition-colors duration-200 rounded-t-lg
            ${activeTab === tab.id
                            ? "text-blue-600 bg-white"
                            : "text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTabSpeech"
                            className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-lg"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};
