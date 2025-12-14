import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import WardLayout from "../../layouts/WardLayout";
import { Briefcase, ArrowLeft, Edit, User, Building } from "lucide-react";
import { type Calling } from "./components/CallingsTable";

// Mock Data (duplicated from index.tsx for now, ideally should be shared or fetched)
const MOCK_CALLINGS: Calling[] = [
    { id: 1, name: "Obispo", organization: "Bishopric", memberAssigned: "Anderson N. Horvath", status: "filled" },
    { id: 2, name: "Presidente del Cuórum", organization: "Elders Quorum", memberAssigned: "Juan Perez", status: "filled" },
    { id: 3, name: "Presidenta de la Sociedad de Socorro", organization: "Relief Society", memberAssigned: "Maria Gonzalez", status: "filled" },
    { id: 4, name: "Maestro de Escuela Dominical", organization: "Sunday School", status: "vacant" },
    { id: 5, name: "Presidenta de Primaria", organization: "Primary", memberAssigned: "Ana Lopez", status: "filled" },
];

export default function CallingDetail() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { id } = useParams();

    const calling = MOCK_CALLINGS.find((c) => c.id === Number(id));

    if (!calling) {
        return (
            <WardLayout>
                <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"} flex items-center justify-center`}>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Llamamiento no encontrado</h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver</span>
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={() => console.log("Edit calling", calling)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-all"
                            >
                                <Edit className="w-4 h-4" />
                                Editar
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className={`rounded-2xl shadow-sm border p-8 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                        }`}>
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600"
                                    }`}>
                                    <Briefcase className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                        {calling.name}
                                    </h1>
                                    <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${calling.status === 'filled'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {calling.status === 'filled' ? 'Cubierto' : 'Vacante'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Organization Info */}
                            <div className={`p-6 rounded-xl border ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100"
                                }`}>
                                <h3 className={`text-sm font-medium uppercase tracking-wider mb-4 ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                    Organización
                                </h3>
                                <div className="flex items-center gap-3">
                                    <Building className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                                    <span className={`text-lg font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                                        {calling.organization}
                                    </span>
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className={`p-6 rounded-xl border ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100"
                                }`}>
                                <h3 className={`text-sm font-medium uppercase tracking-wider mb-4 ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                    Miembro Asignado
                                </h3>
                                <div className="flex items-center gap-3">
                                    <User className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                                    <span className={`text-lg font-medium ${calling.memberAssigned
                                            ? (isDark ? "text-gray-200" : "text-gray-900")
                                            : (isDark ? "text-gray-500" : "text-gray-400 italic")
                                        }`}>
                                        {calling.memberAssigned || "Sin asignar"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WardLayout>
    );
}
