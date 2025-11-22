import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import WardLayout from "../../layouts/WardLayout";
import { CallingsTabs } from "./components/CallingsTabs";
import { CallingsFilter } from "./components/CallingsFilter";
import { CallingsTable, type Calling } from "./components/CallingsTable";
import { Pagination } from "./components/Pagination";
import { Plus, Briefcase } from "lucide-react";

// Mock Data
const MOCK_CALLINGS: Calling[] = [
    { id: 1, name: "Obispo", organization: "Bishopric", memberAssigned: "Anderson N. Horvath", status: "filled" },
    { id: 2, name: "Presidente del Cuórum", organization: "Elders Quorum", memberAssigned: "Juan Perez", status: "filled" },
    { id: 3, name: "Presidenta de la Sociedad de Socorro", organization: "Relief Society", memberAssigned: "Maria Gonzalez", status: "filled" },
    { id: 4, name: "Maestro de Escuela Dominical", organization: "Sunday School", status: "vacant" },
    { id: 5, name: "Presidenta de Primaria", organization: "Primary", memberAssigned: "Ana Lopez", status: "filled" },
];

export default function Callings() {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [orgFilter, setOrgFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredCallings = useMemo(() => {
        return MOCK_CALLINGS.filter((calling) => {
            // Filter by Tab (Status)
            if (activeTab === "filled" && calling.status !== "filled") return false;
            if (activeTab === "vacant" && calling.status !== "vacant") return false;

            // Filter by Name (Search)
            if (searchTerm && !calling.name.toLowerCase().includes(searchTerm.toLowerCase()))
                return false;

            // Filter by Organization
            if (orgFilter && calling.organization !== orgFilter)
                return false;

            return true;
        });
    }, [activeTab, searchTerm, orgFilter]);

    const totalPages = Math.ceil(filteredCallings.length / itemsPerPage);
    const paginatedCallings = filteredCallings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (calling: Calling) => {
        console.log("Edit calling", calling);
    };

    const handleDelete = (calling: Calling) => {
        console.log("Delete calling", calling);
    };

    const handleView = (calling: Calling) => {
        console.log("View calling", calling);
    };

    return (
        <WardLayout>
            <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Llamamientos
                            </h1>
                            <p className="text-gray-500">Administra los llamamientos y organizaciones del barrio.</p>
                        </div>
                        <button
                            onClick={() => console.log("Create calling")}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Crear Llamamiento
                        </button>
                    </div>

                    {/* Tabs */}
                    <CallingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Main Content Area */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        {/* Filters */}
                        <CallingsFilter
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            orgFilter={orgFilter}
                            onOrgFilterChange={setOrgFilter}
                            onSearch={() => setCurrentPage(1)}
                        />

                        {/* Table */}
                        <CallingsTable
                            callings={paginatedCallings}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                        />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </WardLayout>
    );
}
