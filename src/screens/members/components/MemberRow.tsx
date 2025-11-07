// src/screens/members/components/MemberRow.tsx
import { Edit2, Trash2 } from "lucide-react";

import { translate } from "../../../lang";
import type { Member } from "../../../types/members";

interface Props { member: Member; }

export default function MemberRow({ member }: Props) {
    return (
        <tr className="border-t border-blue-100 hover:bg-blue-50 transition">
            <td className="p-4 font-medium">{member.name}</td>
            <td className="p-4">{member.email}</td>
            <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${member.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {member.status === "active" ? translate("Members.filterActive") : translate("Members.filterInactive")}
                </span>
            </td>
            <td className="p-4">{member.lastTalk}</td>
            <td className="p-4 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-5 h-5" title={translate("Members.editButton")} /></button>
                <button className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" title={translate("Members.deleteButton")} /></button>
            </td>
        </tr>
    );
}