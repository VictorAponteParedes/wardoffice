import { User, Church } from "lucide-react";
import { TextInput } from "../../../components/form/TextInput";
import { DateInput } from "../../../components/form/inputDate";
import { motion } from "framer-motion";

export const GeneralInfoSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-sud-blue rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">Información General</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <DateInput name="date" label="Fecha" />
                <TextInput
                    name="leader"
                    label="Dirige"
                    placeholder="Nombre del dirigente"
                    icon={User}
                />
                <TextInput
                    name="presider"
                    label="Preside"
                    placeholder="Obispo / Presidente de rama"
                    icon={Church}
                />
            </div>
        </motion.div>
    );
};
