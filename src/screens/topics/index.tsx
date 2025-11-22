import { motion } from "framer-motion";
import { Search, Plus, BookOpen, ArrowRight, Edit, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTopics } from "../../hooks/useTopics";
import WardLayout from "../../layouts/WardLayout";
import { RoutesView } from "../../navigation/routes";

export default function Topics() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { topics, loading, error } = useTopics();

    const [searchTerm, setSearchTerm] = useState("");

    const filteredTopics = useMemo(() => {
        return topics.filter((topic) =>
            searchTerm === "" ||
            topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [topics, searchTerm]);

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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`max-w-7xl mx-auto p-6 space-y-8 rounded-2xl shadow-2xl ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-white"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
                            <BookOpen className="w-10 h-10 text-primary" />
                            Temas de Discurso
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                            Gestión de temas y sugerencias para discursos
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(RoutesView.topicsCreate)}
                        className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full font-bold shadow-xl hover:bg-deep-cerulean-900 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                        Nuevo Tema
                    </button>
                </div>

                {/* Barra de búsqueda */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar temas..."
                        className={`w-full pl-14 pr-6 py-4 rounded-full border-2 text-lg shadow-lg outline-none transition-all focus:ring-4 focus:ring-primary/20 ${isDark
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
                            : "bg-white border-blue-200 placeholder-blue-500 focus:border-primary"
                            }`}
                    />
                </div>

                {/* Lista */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.map((topic) => (
                        <motion.div
                            key={topic.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-2xl shadow-lg border transition-all ${isDark
                                ? "bg-gray-800 border-gray-700 hover:border-primary"
                                : "bg-white border-blue-100 hover:border-primary"
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                                {topic.title}
                            </h3>
                            <p className={`mb-4 line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                {topic.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {topic.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => navigate(RoutesView.topicsDetail.replace(":id", topic.id))}
                                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                                    title="Ver detalle"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => navigate(RoutesView.topicsEdit.replace(":id", topic.id))}
                                    className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400"
                                    title="Editar"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </WardLayout>
    );
}