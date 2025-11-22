import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Calendar, Tag } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useTopics } from "../../hooks/useTopics";
import WardLayout from "../../layouts/WardLayout";
import { RoutesView } from "../../navigation/routes";
import type { TopicType } from "../../types/topics";

export default function TopicDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { getTopic, loading } = useTopics();
    const [topic, setTopic] = useState<TopicType | undefined>(undefined);

    useEffect(() => {
        if (!loading && id) {
            const found = getTopic(id);
            setTopic(found);
        }
    }, [loading, id, getTopic]);

    if (loading) {
        return (
            <WardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                </div>
            </WardLayout>
        );
    }

    if (!topic) {
        return (
            <WardLayout>
                <div className="text-center p-10">
                    <h2 className="text-2xl text-red-600">Tema no encontrado</h2>
                    <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 hover:underline">
                        Volver
                    </button>
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
                    }`}
            >
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        Volver
                    </button>
                    <button
                        onClick={() => navigate(RoutesView.topicsEdit.replace(":id", topic.id))}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-deep-cerulean-900 transition-colors"
                    >
                        <Edit className="w-5 h-5" />
                        Editar
                    </button>
                </div>

                <h1 className="text-4xl font-bold mb-4 text-primary">{topic.title}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                    {topic.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <Tag className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>

                <div className={`p-6 rounded-xl mb-8 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                    <h3 className="text-lg font-semibold mb-2 opacity-70">Descripción</h3>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {topic.description}
                    </p>
                </div>

                {topic.lastUsed && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-5 h-5" />
                        <span>Última vez usado: {topic.lastUsed}</span>
                    </div>
                )}
            </motion.div>
        </WardLayout>
    );
}
