import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useTopics } from "../../hooks/useTopics";
import WardLayout from "../../layouts/WardLayout";
import { RoutesView } from "../../navigation/routes";

export default function TopicForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { getTopic, loading } = useTopics();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
    });

    const isEdit = !!id;

    useEffect(() => {
        if (isEdit && !loading && id) {
            const topic = getTopic(id);
            if (topic) {
                setFormData({
                    title: topic.title,
                    description: topic.description,
                    tags: topic.tags.join(", "),
                });
            }
        }
    }, [isEdit, loading, id, getTopic]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would call an API to save the topic
        console.log("Saving topic:", formData);
        navigate(RoutesView.topics);
    };

    if (loading && isEdit) {
        return (
            <WardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
                    }`}
            >
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        Cancelar
                    </button>
                    <h1 className="text-3xl font-bold text-primary">
                        {isEdit ? "Editar Tema" : "Nuevo Tema"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">
                            Título
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={`w-full p-4 rounded-xl border-2 outline-none transition-all focus:ring-2 focus:ring-primary/50 ${isDark
                                ? "bg-gray-800 border-gray-700 focus:border-primary"
                                : "bg-gray-50 border-gray-200 focus:border-primary"
                                }`}
                            placeholder="Ej: La Fe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">
                            Descripción
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={`w-full p-4 rounded-xl border-2 outline-none transition-all focus:ring-2 focus:ring-primary/50 ${isDark
                                ? "bg-gray-800 border-gray-700 focus:border-primary"
                                : "bg-gray-50 border-gray-200 focus:border-primary"
                                }`}
                            placeholder="Describe el tema..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">
                            Etiquetas (separadas por coma)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className={`w-full p-4 rounded-xl border-2 outline-none transition-all focus:ring-2 focus:ring-primary/50 ${isDark
                                ? "bg-gray-800 border-gray-700 focus:border-primary"
                                : "bg-gray-50 border-gray-200 focus:border-primary"
                                }`}
                            placeholder="Ej: Fe, Esperanza, Caridad"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${isDark
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                }`}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-deep-cerulean-900 transition-all transform hover:scale-105"
                        >
                            <Save className="w-5 h-5" />
                            Guardar
                        </button>
                    </div>
                </form>
            </motion.div>
        </WardLayout>
    );
}
