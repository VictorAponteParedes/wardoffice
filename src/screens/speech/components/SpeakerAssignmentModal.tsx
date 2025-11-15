// src/speech/components/SpeakerAssignmentModal.tsx
// Componente para el modal completo
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, RotateCcw } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import AssignmentGenerator from "./AssignmentGenerator";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (speaker: any) => void;
}

export default function SpeakerAssignmentModal({ isOpen, onClose, onAssign }: Props) {
    const { isDark } = useTheme();
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    return (
        <Transition show={isOpen}>
            <Dialog onClose={onClose} className="relative z-50">
                {/* Overlay */}
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                </Transition.Child>

                {/* Modal Content */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                                }`}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <Dialog.Title className="text-2xl font-bold text-primary">
                                    Asignación de Discursos
                                </Dialog.Title>
                                <button onClick={onClose} className="text-gray-500 hover:text-primary">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
                                Genera una asignación inspirada para el próximo discurso.
                            </p>

                            {/* Generador de asignación */}
                            <AssignmentGenerator onGenerate={setSelectedAssignment} />

                            {selectedAssignment && (
                                <div className="mt-6 p-4 rounded-xl bg-primary dark:bg-primary/20">
                                    <h3 className="font-bold text-primary mb-2">Asignación Generada:</h3>
                                    <p className="font-medium text-primary">Orador: {selectedAssignment.member.name}</p>
                                    <p className="font-medium text-primary">Tema: {selectedAssignment.topic}</p>
                                </div>
                            )}

                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedAssignment) {
                                            onAssign({
                                                ...selectedAssignment,
                                                id: Date.now().toString(),
                                                date: new Date().toISOString(),
                                            });
                                        }
                                    }}
                                    disabled={!selectedAssignment}
                                    className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-deep-cerulean-900 transition disabled:opacity-50"
                                >
                                    Confirmar Asignación
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}