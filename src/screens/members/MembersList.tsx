import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useMembers } from "../../hooks/useMembers";
import { useMemberStore } from "../../store/memberStore";
import WardLayout from "../../layouts/WardLayout";
import { translate } from "../../lang";
import { MembersTabs } from "./components/MembersTabs";
import { MembersFilter } from "./components/MembersFilter";
import { MembersTable } from "./components/MembersTable";
import { Pagination } from "./components/Pagination";
import type { Member } from "../../types/members";
import { Plus } from "lucide-react";

export default function MembersList() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  // Use useMembers to trigger data loading
  const { loading, error } = useMembers();
  // Use store directly for flexible local filtering
  const { members: allMembers } = useMemberStore();

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [callingFilter, setCallingFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      // Filter by Status (Tabs)
      if (activeTab !== "all" && member.status !== activeTab) return false;

      // Filter by Name (Search)
      if (
        searchTerm &&
        !member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      // Filter by Calling
      if (
        callingFilter &&
        !member.calling.toLowerCase().includes(callingFilter.toLowerCase())
      )
        return false;

      return true;
    });
  }, [allMembers, activeTab, searchTerm, callingFilter]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (member: Member) => {
    // Navigate to edit screen (assuming it exists or reuse create with ID)
    // For now, we'll assume a route like /members/edit/:id or just log it
    console.log("Edit member", member);
    // If you have a route: navigate(`/members/edit/${member.id}`);
  };

  const handleDelete = (member: Member) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${member.name}?`)) {
      console.log("Delete member", member);
      // Implement delete logic here (call store action)
    }
  };

  const handleView = (member: Member) => {
    navigate(`/members/${member.id}`);
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
          {translate("Members.error")}
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Miembros</h1>
              <p className="text-gray-500">Administra los miembros del barrio y sus llamamientos.</p>
            </div>
            <button
              onClick={() => navigate("/members/create")}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              {translate("Members.buttonAdd")}
            </button>
          </div>

          {/* Tabs */}
          <MembersTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content Area */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            {/* Filters */}
            <MembersFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              callingFilter={callingFilter}
              onCallingFilterChange={setCallingFilter}
              onSearch={() => setCurrentPage(1)} // Reset to page 1 on explicit search
            />

            {/* Table */}
            <MembersTable
              members={paginatedMembers}
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
