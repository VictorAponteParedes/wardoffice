import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSpeakers } from "../../hooks/useSpeakers";
import WardLayout from "../../layouts/WardLayout";
import { translate } from "../../lang";
import { SpeechTabs } from "./components/SpeechTabs";
import { SpeechFilter } from "./components/SpeechFilter";
import { SpeechTable } from "./components/SpeechTable";
import { Pagination } from "./components/Pagination";
import type { SpeakerType } from "../../types/speech";
import { Plus, Mic } from "lucide-react";
import SpeakerAssignmentModal from "./components/SpeakerAssignmentModal";
import DeleteConfirmationModal from "../../components/DeleteAccountModal";

export default function Speech() {
    // const navigate = useNavigate();
    const { isDark } = useTheme();
    const { speakers, loading, error } = useSpeakers();

    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [topicFilter, setTopicFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [speakerToDelete, setSpeakerToDelete] = useState<SpeakerType | null>(null);
    const itemsPerPage = 10;


    const handleDelete = (speaker: SpeakerType) => {
        setSpeakerToDelete(speaker);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (speakerToDelete) {
            console.log("Eliminando definitivamente a:", speakerToDelete.name);
            // Aquí iría tu lógica real de borrado (API, etc.)
            // deleteSpeaker(speakerToDelete.id);
        }
        setIsDeleteModalOpen(false);
        setSpeakerToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setSpeakerToDelete(null);
    };

    const filteredSpeakers = useMemo(() => {
        return speakers.filter((speaker) => {
            // Filter by Tab (Mock logic for now, as we don't have date objects in simple mock)
            // In a real app, check dates for upcoming/past
            if (activeTab === "upcoming") {
                // Mock logic: assume all are upcoming for now or filter by some property
            } else if (activeTab === "past") {
                // Mock logic
            }

            // Filter by Name (Search)
            if (
                searchTerm &&
                !speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
                return false;

            // Filter by Topic
            if (
                topicFilter &&
                !speaker.topic?.toLowerCase().includes(topicFilter.toLowerCase())
            )
                return false;

            return true;
        });
    }, [speakers, activeTab, searchTerm, topicFilter]);

    const totalPages = Math.ceil(filteredSpeakers.length / itemsPerPage);
    const paginatedSpeakers = filteredSpeakers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (speaker: SpeakerType) => {
        console.log("Edit speaker", speaker);
    };


    const handleView = (speaker: SpeakerType) => {
        console.log("View speaker", speaker);
    };

    if (loading) {
        return (
            <WardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            </WardLayout>
        );
    }

    if (error) {
        return (
            <WardLayout>
                <div className="text-center text-red-600 text-2xl p-10">
                    {translate("Speech.errorLoading")}
                </div>
            </WardLayout>
        );
    }

    return (
        <WardLayout>
            <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Mic className="w-6 h-6 text-blue-600" />
                                {translate("Speech.title")}
                            </h1>
                            <p className="text-gray-500">{translate("Speech.subtitle")}</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            {translate("Speech.addButton")}
                        </button>
                    </div>

                    {/* Tabs */}
                    <SpeechTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Main Content Area */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        {/* Filters */}
                        <SpeechFilter
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            topicFilter={topicFilter}
                            onTopicFilterChange={setTopicFilter}
                            onSearch={() => setCurrentPage(1)}
                        />

                        {/* Table */}
                        <SpeechTable
                            speakers={paginatedSpeakers}
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

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Eliminar discurso"
                itemName={speakerToDelete?.name || ""}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />

            {/* Modal de Asignación */}
            <SpeakerAssignmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAssign={(newSpeaker) => {
                    console.log("Nuevo discursante asignado:", newSpeaker);
                    setIsModalOpen(false);
                }}
            />
        </WardLayout>
    );
}