import { Music } from "lucide-react";
import { TextInput } from "../../../components/form/TextInput";
import { TextArea } from "../../../components/form/TextArea";
import { motion } from "framer-motion";

export const SacramentSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-purple-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">Ordenanzas y Asuntos</h2>
            </div>

            <div className="space-y-6">
                <TextArea
                    name="business"
                    label="Asuntos del Barrio"
                    placeholder="Relevos, sostenimientos, ordenanzas..."
                    rows={3}
                />
                <TextInput
                    name="sacramentalHymn"
                    label="Himno Sacramental"
                    placeholder="N° Título del himno"
                    icon={Music}
                />
            </div>
        </motion.div>
    );
};
