import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { translate } from "@/lang";

export const AgendaHeader = () => {
    return (
        <div className="relative text-center mb-12">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 inline-flex flex-col items-center gap-4"
            >
                <div className="p-4 bg-white rounded-2xl shadow-lg shadow-sud-blue/10 border border-sud-blue/10">
                    <BookOpen className="w-12 h-12 text-sud-blue" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {translate("Agenda.title") || "Sacramental"}
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Planificación del servicio dominical
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
