import { motion } from "framer-motion";
import { Search, Plus, Filter, MoreVertical, ChevronLeft, ChevronRight, Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTopics } from "../../hooks/useTopics";
import WardLayout from "../../layouts/WardLayout";
import { RoutesView } from "../../navigation/routes";
import type { TopicType } from "@/types/topics";

export default function Topics() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { topics, loading, error } = useTopics();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredTopics = useMemo(() => {
        return topics.filter((topic) =>
            searchTerm === "" ||
            topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [topics, searchTerm]);

    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
    const paginatedTopics = filteredTopics.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                    Error al cargar los temas.
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`max-w-7xl mx-auto rounded-3xl shadow-xl overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"
                    }`}
            >
                {/* Header Section */}
                <div className={`p-8 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                Temas de Discurso
                            </h1>
                            <div className="flex gap-4 mt-2">
                                <button className={`text-sm font-medium pb-1 border-b-2 ${isDark ? "text-white border-primary" : "text-gray-900 border-primary"}`}>
                                    Lista de Temas
                                </button>
                                {/* Placeholder for other tabs if needed */}
                                <button className={`text-sm font-medium pb-1 border-b-2 border-transparent ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
                                    Sugeridos
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(RoutesView.topicsCreate)}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Nuevo Tema
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            <span className={`font-bold text-lg mr-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                                {filteredTopics.length}
                            </span>
                            Temas encontrados
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Filtro por:</span>
                                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}`}>
                                    Todos <Filter className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                            <div className="relative flex-1 md:w-64">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar en temas..."
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none border transition-all ${isDark
                                        ? "bg-gray-800 border-gray-700 text-white focus:border-primary placeholder-gray-500"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary placeholder-gray-400"
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`text-xs uppercase tracking-wider text-left ${isDark ? "bg-gray-900 text-gray-500" : "bg-gray-50 text-gray-400"}`}>
                            <tr>
                                <th className="px-8 py-4 font-medium">#</th>
                                <th className="px-8 py-4 font-medium">Tema</th>
                                <th className="px-8 py-4 font-medium">Descripción</th>
                                <th className="px-8 py-4 font-medium">Etiquetas</th>
                                <th className="px-8 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                            {paginatedTopics.map((topic, index) => (
                                <tr
                                    key={topic.id}
                                    className={`group transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-blue-50/50"
                                        }`}
                                >
                                    <td className={`px-8 py-4 text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                                                }`}>
                                                {topic.title.charAt(0).toUpperCase()}
                                            </div>
                                            <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                                {topic.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={`px-8 py-4 text-sm max-w-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                        {topic.description}
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {topic.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className={`px-2 py-0.5 rounded text-xs font-medium ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                                                    }`}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {topic.tags.length > 2 && (
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                                                    }`}>
                                                    +{topic.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => navigate(RoutesView.topicsDetail.replace(":id", topic.id))}
                                                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-white text-gray-400 hover:text-primary shadow-sm"
                                                    }`}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => navigate(RoutesView.topicsEdit.replace(":id", topic.id))}
                                                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-white text-gray-400 hover:text-primary shadow-sm"
                                                    }`}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className={`p-6 border-t flex justify-end items-center gap-2 ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${isDark
                            ? "text-gray-400 hover:bg-gray-800 disabled:opacity-50"
                            : "text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${isDark
                            ? "text-gray-400 hover:bg-gray-800 disabled:opacity-50"
                            : "text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                            }`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </WardLayout>
    );
}