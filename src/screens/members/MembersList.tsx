// src/screens/members/MembersList.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, Plus } from "lucide-react";
import { translate } from "../../lang";
import { MessageToast } from "../../components/MessageToast";
import MemberRow from "./components/MemberRow";
import { useMembers } from "../../hooks/useMembers";
import WardLayout from "../../layouts/WardLayout";

export default function MembersList() {
    const { members, loading, error, search, setSearch, filter, setFilter } = useMembers();
    const [message, setMessage] = useState<{ type: "success" | "error"; title: string; description: string } | null>(null);

    if (loading) return <p className="text-center text-2xl">{translate("Members.loading")}</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <WardLayout>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Título */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-800 flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-yellow-600" />
                        {translate("Members.title")}
                    </h1>
                    <p className="text-xl text-blue-700 mt-2">{translate("Members.subtitle")}</p>
                </div>

                {/* Búsqueda + Filtros */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={translate("Members.searchPlaceholder")}
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-blue-300 focus:border-blue-600 outline-none shadow-md"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value as any)}
                            className="px-4 py-3 rounded-full border border-blue-300 focus:border-blue-600 outline-none shadow-md"
                        >
                            <option value="all">{translate("Members.filterAll")}</option>
                            <option value="active">{translate("Members.filterActive")}</option>
                            <option value="inactive">{translate("Members.filterInactive")}</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-800">
                        <Plus className="w-5 h-5" />
                        {translate("Members.addButton")}
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto bg-white/90 rounded-3xl shadow-xl border border-blue-100">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-100 text-blue-800 text-left">
                                <th className="p-4">{translate("Members.nameLabel")}</th>
                                <th className="p-4">{translate("Members.emailLabel")}</th>
                                <th className="p-4">{translate("Members.statusLabel")}</th>
                                <th className="p-4">{translate("Members.lastTalkLabel")}</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-8 text-gray-600">{translate("Members.noResults")}</td></tr>
                            ) : (
                                members.map(member => <MemberRow key={member.id} member={member} />)
                            )}
                        </tbody>
                    </table>
                </div>

                {message && <MessageToast {...message} onClose={() => setMessage(null)} />}
            </motion.div>
        </WardLayout>
    );
}