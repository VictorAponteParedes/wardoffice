// src/speech/index.tsx
import { motion } from "framer-motion";
import { Search, Plus, Users, ArrowLeft, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import { translate } from "../../lang";
import { useTheme } from "../../context/ThemeContext";
import { useSpeakers } from "../../hooks/useSpeakers";
import WardLayout from "../../layouts/WardLayout";
import SpeakerCard from "./components/SpeakerCard";

export default function Speech() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { speakers, loading, error } = useSpeakers();

    const [searchTerm, setSearchTerm] = useState("");

    const filteredSpeakers = useMemo(() => {
        return speakers.filter((speaker) =>
            searchTerm === "" ||
            speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            speaker.topic?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [speakers, searchTerm]);

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
                    {translate("Speech.errorLoading")}
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
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-primary hover:text-deep-cerulean-900 transition-transform hover:scale-110"
                            aria-label="Volver atrás"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
                                <Mic className="w-10 h-10 text-primary" />
                                {translate("Speech.title")}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                                {translate("Speech.subtitle")}
                            </p>
                        </div>
                    </div>

                    {/* Botón Agregar Discursante */}
                    <button
                        onClick={() => navigate("/speech/create")}
                        className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full font-bold shadow-xl hover:bg-deep-cerulean-900 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                        {translate("Speech.addButton")}
                    </button>
                </div>

                {/* Barra de búsqueda */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={translate("Speech.searchPlaceholder")}
                        className={`w-full pl-14 pr-6 py-4 rounded-full border-2 text-lg shadow-lg outline-none transition-all focus:ring-4 focus:ring-primary/20 ${isDark
                                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
                                : "bg-white border-blue-200 placeholder-blue-500 focus:border-primary"
                            }`}
                    />
                </div>

                {/* Contador */}
                <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                        {filteredSpeakers.length}{" "}
                        {filteredSpeakers.length === 1
                            ? translate("Speech.count.one")
                            : translate("Speech.count.other")}
                    </p>
                </div>

                {/* Lista o estado vacío */}
                {filteredSpeakers.length === 0 ? (
                    <div className={`text-center py-20 rounded-3xl ${isDark ? "bg-gray-800" : "bg-blue-50"}`}>
                        <Users className="w-20 h-20 text-primary mx-auto mb-6 opacity-80" />
                        <p className="text-2xl font-semibold text-primary mb-6">
                            {speakers.length === 0
                                ? translate("Speech.noSpeakers")
                                : translate("Speech.noResults")}
                        </p>
                        {speakers.length === 0 && (
                            <button
                                onClick={() => navigate("/speech/create")}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:bg-deep-cerulean-900 transition-all transform hover:scale-105"
                            >
                                <Plus className="w-6 h-6" />
                                {translate("Speech.addButtonEmpty")}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSpeakers.map((speaker) => (
                            <SpeakerCard key={speaker.id} speaker={speaker} />
                        ))}
                    </div>
                )}
            </motion.div>
        </WardLayout>
    );
}