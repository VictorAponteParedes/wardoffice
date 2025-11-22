import React from "react";
import type { SpeakerType } from "../../../types/speech";

interface SpeechTableProps {
    speakers: SpeakerType[];
    onEdit: (speaker: SpeakerType) => void;
    onDelete: (speaker: SpeakerType) => void;
    onView: (speaker: SpeakerType) => void;
}

export const SpeechTable: React.FC<SpeechTableProps> = ({
    speakers,
    onEdit,
    onDelete,
    onView,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Discursante</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tema</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Llamamiento</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {speakers.map((speaker) => (
                            <tr key={speaker.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                            {speaker.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{speaker.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{speaker.topic || "Sin tema"}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">
                                        {speaker.date || "Sin fecha"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                        {speaker.calling || "Miembro"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onView(speaker)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                                            title="Ver"
                                        >
                                            <span className="text-xs font-medium px-2">Ver</span>
                                        </button>
                                        <button
                                            onClick={() => onEdit(speaker)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                                            title="Editar"
                                        >
                                            <span className="text-xs font-medium px-2">Editar</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(speaker)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                            title="Eliminar"
                                        >
                                            <span className="text-xs font-medium px-2">Eliminar</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
