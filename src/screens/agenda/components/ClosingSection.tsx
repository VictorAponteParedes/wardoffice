import { Music, User } from "lucide-react";
import { TextInput } from "@/components/form/TextInput";
import { motion } from "framer-motion";

export const ClosingSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-red-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">Clausura</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                    name="closingHymn"
                    label="Himno Final"
                    placeholder="N° Título del himno"
                    icon={Music}
                />
                <TextInput
                    name="closingPrayer"
                    label="Oración Final"
                    placeholder="Nombre del hermano/a"
                    icon={User}
                />
            </div>
        </motion.div>
    );
};
