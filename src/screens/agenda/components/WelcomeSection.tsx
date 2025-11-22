import { TextArea } from "../../../components/form/TextArea";
import { motion } from "framer-motion";

export const WelcomeSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-sud-gold rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">Bienvenida y Anuncios</h2>
            </div>

            <div className="space-y-6">
                <TextArea
                    name="welcome"
                    label="Bienvenida y reconocimiento"
                    placeholder="Escribe el mensaje de bienvenida..."
                    rows={2}
                />
                <TextArea
                    name="announcements"
                    label="Anuncios"
                    placeholder="Escribe un anuncio por línea..."
                    rows={4}
                />
            </div>
        </motion.div>
    );
};
