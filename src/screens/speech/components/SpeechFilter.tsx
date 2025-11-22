import React from "react";
import { Search, Download } from "lucide-react";

interface SpeechFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    topicFilter: string;
    onTopicFilterChange: (value: string) => void;
    onSearch: () => void;
}

export const SpeechFilter: React.FC<SpeechFilterProps> = ({
    searchTerm,
    onSearchChange,
    topicFilter,
    onTopicFilterChange,
    onSearch,
}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-1 gap-4 w-full md:w-auto">
                <div className="flex-1 flex items-center gap-2">
                    <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Nombre:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por nombre..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="flex-1 flex items-center gap-2">
                    <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Tema:</label>
                    <input
                        type="text"
                        value={topicFilter}
                        onChange={(e) => onTopicFilterChange(e.target.value)}
                        placeholder="Filtrar por tema..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onSearch}
                    className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                    <Search size={18} />
                    Buscar
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
                    <Download size={18} />
                    Exportar
                </button>
            </div>
        </div>
    );
};
