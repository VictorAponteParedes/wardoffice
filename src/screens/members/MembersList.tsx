// src/screens/members/MembersList.tsx
import { motion } from "framer-motion";
import { Search, Filter, Plus, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { translate } from "../../lang";

import { MemberCard } from "./components/MemberCard";
import { useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useMembers } from "../../hooks/useMembers";
import WardLayout from "../../layouts/WardLayout";

export default function MembersList() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { members: rawMembers, loading, error } = useMembers();

    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        name: "",
        status: "all",
        calling: "",
    });

    const filteredMembers = useMemo(() => {
        return rawMembers.filter(member => {
            const matchesSearch = searchTerm === "" ||
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.calling.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesName = filters.name === "" || member.name.toLowerCase().includes(filters.name.toLowerCase());
            const matchesStatus = filters.status === "all" || member.status === filters.status;
            const matchesCalling = filters.calling === "" || member.calling.toLowerCase().includes(filters.calling.toLowerCase());

            return matchesSearch && matchesName && matchesStatus && matchesCalling;
        });
    }, [rawMembers, searchTerm, filters]);

    const handleFilterChange = (e: any) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setSearchTerm("");
        setFilters({ name: "", status: "all", calling: "" });
    };

    if (loading) {
        return (
            <WardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                </div>
            </WardLayout>
        );
    }

    if (error) {
        return (
            <WardLayout>
                <div className="text-center text-red-600 text-2xl p-10">
                    {translate("Members.error")}
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`max-w-7xl mx-auto p-6 space-y-8 rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-white'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-bold text-blue-900 flex items-center gap-3">
                                <Users className="w-10 h-10 text-yellow-600" />
                                {translate("Members.title")}
                            </h1>
                            <p className="text-lg text-blue-700">{translate("Members.subtitle")}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/members/create")}
                        className="flex items-center gap-3 bg-yellow-500 text-white px-6 py-4 rounded-full font-bold shadow-xl hover:bg-yellow-600 transition-all"
                    >
                        <Plus className="w-6 h-6" />
                        {translate("Members.buttonAdd")}
                    </button>
                </div>

                {/* Búsqueda + Filtros */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-6 h-6" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder={translate("Members.searchPlaceholder")}
                            className={`w-full pl-14 pr-6 py-4 rounded-full border-2 ${isDark
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                                : 'bg-white border-blue-200 placeholder-blue-400 focus:border-blue-600'
                                } shadow-lg outline-none text-lg`}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-full font-medium shadow-lg transition-all ${isDark
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                    >
                        <Filter className="w-5 h-5" />
                        Filtros
                    </button>
                </div>

                {/* Filtros Avanzados */}
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className={`p-6 rounded-2xl shadow-inner space-y-4 ${isDark ? 'bg-gray-800' : 'bg-blue-50'
                            }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-blue-800 mb-2">
                                    {translate("Members.filterName")}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-300 focus:border-blue-600 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-blue-800 mb-2">
                                    {translate("Members.filterStatus")}
                                </label>
                                <select
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-300 focus:border-blue-600 outline-none"
                                >
                                    <option value="all">Todos</option>
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-blue-800 mb-2">
                                    {translate("Members.filterCalling")}
                                </label>
                                <input
                                    type="text"
                                    name="calling"
                                    value={filters.calling}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-300 focus:border-blue-600 outline-none"
                                />
                            </div>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={resetFilters}
                                className="px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
                            >
                                {translate("Members.buttonReset")}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Contador */}
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-800">
                        {filteredMembers.length} {translate("Members.count")}
                    </p>
                </div>

                {/* Lista de Cards */}
                {filteredMembers.length === 0 ? (
                    <div className={`text-center py-20 rounded-3xl ${isDark ? 'bg-gray-800' : 'bg-blue-50'}`}>
                        <Users className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                        <p className="text-2xl font-semibold text-blue-700">
                            {rawMembers.length === 0 ? translate("Members.noMembers") : translate("Members.noResults")}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredMembers.map(member => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                )}
            </motion.div>
        </WardLayout>
    );
}