// src/screens/members/components/MemberCard.tsx
import { motion } from "framer-motion";
import { Users, Mail, Calendar, UserCheck, ImageOff, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { format, differenceInMonths } from "date-fns";
import type { Member } from "../../../types/members";
import { translate } from "../../../lang";

interface Props {
    member: Member;
}

export const MemberCard = ({ member }: Props) => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const monthsAgo = member.lastTalk
        ? differenceInMonths(new Date(), new Date(member.lastTalk))
        : null;

    const goToDetails = () => {
        navigate(`/members/${member.id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl shadow-lg mb-6 border cursor-pointer transition-all ${isDark
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                    : 'bg-white border-blue-100 hover:bg-blue-50'
                }`}
            onClick={goToDetails}
        >
            <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className={`relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-blue-200 ${isDark ? 'bg-gray-700' : 'bg-blue-100'
                    }`}>
                    {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <Users className={`w-12 h-12 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Nombre + Estatus */}
                    <div className="space-y-2">
                        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-blue-900'
                            }`}>
                            <UserCheck className="w-5 h-5 text-yellow-600" />
                            {member.name}
                        </h3>
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${member.status === "active"
                                ? isDark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700"
                                : isDark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-700"
                            }`}>
                            {member.status === "active" ? translate("Members.statusActive") : translate("Members.statusInactive")}
                        </span>
                    </div>

                    {/* Email + Llamado */}
                    <div className="space-y-2">
                        <p className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <Mail className="w-4 h-4" />
                            {member.email}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <strong>Llamado:</strong> {member.calling || "Ninguno"}
                        </p>
                    </div>

                    {/* Último Discurso */}
                    <div className="space-y-2">
                        <p className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <Calendar className="w-4 h-4" />
                            Último discurso
                        </p>
                        <p className={`text-sm font-semibold ${monthsAgo !== null && monthsAgo > 6 ? 'text-red-600' : 'text-green-600'}`}>
                            {member.lastTalk
                                ? `${format(new Date(member.lastTalk), "dd/MM/yyyy")} (${translate("Members.monthsAgo").replace("{{months}}", monthsAgo)})`
                                : translate("Members.neverSpoke")
                            }
                        </p>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col items-end justify-center gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/members/edit/${member.id}`);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${isDark
                                    ? 'border-blue-500 text-blue-300 hover:bg-blue-900'
                                    : 'border-blue-600 text-blue-600 hover:bg-blue-100'
                                }`}
                        >
                            <Edit2 className="w-4 h-4" />
                            {translate("Members.cardEdit")}
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDetails();
                            }}
                            className="text-sm underline hover:no-underline"
                        >
                            {translate("Members.cardView")}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};