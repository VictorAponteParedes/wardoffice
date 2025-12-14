import { useFormContext, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, Plus, Trash2 } from "lucide-react";
import { ToggleSwitch } from "@/components/form/ToggleSwitch";

export const ProgramSection = () => {
    const { control, watch } = useFormContext();
    const isTestimonyDay = watch("testimonies");

    const {
        fields: speakers,
        append: addSpeaker,
        remove: removeSpeaker,
    } = useFieldArray({
        control,
        name: "speakers",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-orange-500 rounded-full" />
                    <h2 className="text-xl font-bold text-gray-800">Programa Espiritual</h2>
                </div>
                <div className="w-48">
                    <ToggleSwitch
                        name="testimonies"
                        label="¿Testimonios?"
                        yesLabel="Sí"
                        noLabel="No"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!isTestimonyDay ? (
                    <motion.div
                        key="speakers"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mic2 className="w-5 h-5" />
                            <span className="font-medium">Asignación de Discursantes</span>
                        </div>

                        <div className="space-y-3">
                            {speakers.map((field, index) => (
                                <motion.div
                                    key={field.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Nombre del discursante"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            defaultValue={field.id || ""}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeSpeaker(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => addSpeaker({ name: "" })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Agregar Discursante
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="testimonies"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-medium">Día de Testimonios</span>
                        </div>

                        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">
                            Los miembros compartirán sus testimonios libremente.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};