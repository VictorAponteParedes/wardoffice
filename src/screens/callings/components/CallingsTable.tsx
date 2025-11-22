import React from "react";
import { Edit2, Trash2, Eye, User } from "lucide-react";

// Mock Type for now
export interface Calling {
    id: number;
    name: string;
    organization: string;
    memberAssigned?: string;
    status: "filled" | "vacant";
}

interface CallingsTableProps {
    callings: Calling[];
    onEdit: (calling: Calling) => void;
    onDelete: (calling: Calling) => void;
    onView: (calling: Calling) => void;
}

export const CallingsTable = ({
    callings,
    onEdit,
    onDelete,
    onView,
}: CallingsTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                            Llamamiento
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                            Organización
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                            Miembro Asignado
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                            Estado
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-gray-500">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {callings.map((calling) => (
                        <tr
                            key={calling.id}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                        >
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                        {calling.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {calling.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{calling.organization}</td>
                            <td className="py-4 px-4">
                                {calling.memberAssigned ? (
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {calling.memberAssigned}
                                    </div>
                                ) : (
                                    <span className="text-gray-400 italic">Sin asignar</span>
                                )}
                            </td>
                            <td className="py-4 px-4">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${calling.status === "filled"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {calling.status === "filled" ? "Ocupado" : "Vacante"}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onView(calling)}
                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Ver detalles"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit(calling)}
                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(calling)}
                                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
