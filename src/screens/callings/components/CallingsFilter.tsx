import React from "react";
import { Search, Filter } from "lucide-react";

interface CallingsFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    orgFilter: string;
    onOrgFilterChange: (value: string) => void;
    onSearch: () => void;
}

export const CallingsFilter = ({
    searchTerm,
    onSearchChange,
    orgFilter,
    onOrgFilterChange,
    onSearch,
}: CallingsFilterProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar llamamiento..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>
            <div className="flex gap-3">
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        value={orgFilter}
                        onChange={(e) => onOrgFilterChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Todas las Organizaciones</option>
                        <option value="Bishopric">Obispado</option>
                        <option value="Elders Quorum">Cuórum de Élderes</option>
                        <option value="Relief Society">Sociedad de Socorro</option>
                        <option value="Primary">Primaria</option>
                        <option value="Young Men">Hombres Jóvenes</option>
                        <option value="Young Women">Mujeres Jóvenes</option>
                        <option value="Sunday School">Escuela Dominical</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
