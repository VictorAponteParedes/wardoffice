import React from "react";
import type { Member } from "../../../types/members";
import { Edit2, Trash2, Eye } from "lucide-react";

interface MembersTableProps {
    members: Member[];
    onEdit: (member: Member) => void;
    onDelete: (member: Member) => void;
    onView: (member: Member) => void;
}

export const MembersTable: React.FC<MembersTableProps> = ({
    members,
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
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nombre</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contacto</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Llamamiento</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{member.name}</div>
                                            <div className="text-xs text-gray-500">ID: {member.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{member.email}</div>
                                    <div className="text-xs text-gray-500">{member.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                        {member.calling || "Sin llamamiento"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${member.status === "active"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {member.status === "active" ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onView(member)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                                            title="Ver"
                                        >
                                            <span className="text-xs font-medium px-2">Ver</span>
                                        </button>
                                        <button
                                            onClick={() => onEdit(member)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                                            title="Editar"
                                        >
                                            <span className="text-xs font-medium px-2">Editar</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(member)}
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
