// src/pages/dashboard/Dashboard.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mic2, Shuffle, Calendar, Sparkles, Church } from "lucide-react";
import WardLayout from "../../layouts/WardLayout";
import { useAuth } from "../../store/authStore";

// === DATOS DE PRUEBA (luego los sacas de una DB) ===
const mockMembers = [
    { id: 1, name: "Hermana López", lastTalk: "2025-09-15", active: true },
    { id: 2, name: "Hermano Pérez", lastTalk: "2025-10-20", active: true },
    { id: 3, name: "Hna. Gómez", lastTalk: "2025-08-01", active: true },
    { id: 4, name: "Elder Ruiz", lastTalk: "2025-10-27", active: true },
    { id: 5, name: "Hna. Morales", lastTalk: "2025-11-03", active: false },
];

const upcomingTalks = [
    { date: "Nov 9", speaker: "Hno. Castillo", topic: "Fe en Jesucristo" },
    { date: "Nov 16", speaker: "Hna. Vargas", topic: "El Libro de Mormón" },
];

export default function Dashboard() {
    const { user } = useAuth();
    const [randomSpeaker, setRandomSpeaker] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    // === SORTEO ALEATORIO REAL (3 semanas cooldown) ===
    const assignRandomTalk = () => {
        setIsSpinning(true);
        setRandomSpeaker(null);

        const today = new Date("2025-11-04");
        const threeWeeksAgo = new Date(today);
        threeWeeksAgo.setDate(today.getDate() - 21);

        const eligible = mockMembers.filter(m => {
            if (!m.active) return false;
            const last = new Date(m.lastTalk);
            return last < threeWeeksAgo;
        });

        setTimeout(() => {
            if (eligible.length === 0) {
                setRandomSpeaker("No hay miembros disponibles");
            } else {
                const winner = eligible[Math.floor(Math.random() * eligible.length)];
                setRandomSpeaker(winner.name);
            }
            setIsSpinning(false);
        }, 2000);
    };

    return (
        <WardLayout>
            <div className="space-y-10">
                {/* Saludo Personalizado */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold text-blue-900 mb-2">
                        Welcome back, {user?.name || "Bishop"}!
                    </h1>
                    <p className="text-xl text-blue-700 flex items-center justify-center gap-2">
                        <Church className="w-6 h-6" />
                        {user?.ward || "Provo 5th Ward"} - November 2025
                    </p>
                </motion.div>

                {/* Tarjetas de Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<Users className="w-8 h-8" />}
                        title="Active Members"
                        value="48"
                        color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        icon={<Mic2 className="w-8 h-8" />}
                        title="Talks This Month"
                        value="8"
                        color="from-yellow-500 to-amber-600"
                    />
                    <StatCard
                        icon={<Calendar className="w-8 h-8" />}
                        title="Upcoming Events"
                        value="3"
                        color="from-green-500 to-emerald-600"
                    />
                    <StatCard
                        icon={<Sparkles className="w-8 h-8" />}
                        title="Available Speakers"
                        value="31"
                        color="from-purple-500 to-indigo-600"
                    />
                </div>

                {/* Próximos Discursos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                        <Mic2 className="w-8 h-8 text-yellow-600" />
                        Upcoming Talks
                    </h2>
                    <div className="space-y-4">
                        {upcomingTalks.map((talk, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                            >
                                <div>
                                    <p className="font-semibold text-blue-900">{talk.speaker}</p>
                                    <p className="text-sm text-blue-700">{talk.topic}</p>
                                </div>
                                <span className="text-2xl font-bold text-blue-600">
                                    {talk.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* BOTÓN MÁGICO: SORTEO ALEATORIO */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                >
                    <button
                        onClick={assignRandomTalk}
                        disabled={isSpinning}
                        className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold text-2xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                    >
                        <motion.div
                            animate={{ rotate: isSpinning ? 360 : 0 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Shuffle className="w-10 h-10" />
                        </motion.div>
                        {isSpinning ? "Sorting..." : "Assign Random Talk"}
                        <Sparkles className="w-10 h-10 group-hover:animate-ping" />
                    </button>

                    {/* Resultado del sorteo */}
                    {randomSpeaker && (
                        <motion.div
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="mt-8 p-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl shadow-xl border-4 border-green-300"
                        >
                            <p className="text-4xl font-bold text-green-800">
                                {randomSpeaker}
                            </p>
                            <p className="text-2xl text-green-700 mt-2">
                                Will give the talk this Sunday!
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </WardLayout>
    );
}

// === Tarjeta Reutilizable ===
function StatCard({ icon, title, value, color }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${color} text-white p-8 rounded-3xl shadow-xl`}
        >
            <div className="flex items-center justify-between mb-4">
                {icon}
                <Sparkles className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-sm opacity-90 mt-2">{title}</p>
        </motion.div>
    );
}