const members = [
    {
        id: 1,
        name: "Brenda H. Branom",
        role: "Web Dev.",
        manager: "@Alexander12",
        department: "Product",
        office: "5 days"
    },
    {
        id: 2,
        name: "Mark J. Lopez",
        role: "UI Designer",
        manager: "@Keever45",
        department: "Project",
        office: "20 days"
    },
    {
        id: 3,
        name: "Doris J. Bartlett",
        role: "Web Dev.",
        manager: "@Alexander12",
        department: "Product",
        office: "15 days"
    },
];

export const RecentMembersList = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-gray-900">Employees</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search employees"
                        className="bg-gray-50 border-none rounded-lg px-4 py-2 text-sm w-full md:w-auto focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <select className="bg-gray-50 border border-gray-100 text-gray-500 text-sm rounded-lg px-3 py-2 outline-none">
                    <option>At office</option>
                </select>
                <select className="bg-gray-50 border border-gray-100 text-gray-500 text-sm rounded-lg px-3 py-2 outline-none">
                    <option>All job titles</option>
                </select>
                <select className="bg-gray-50 border border-gray-100 text-gray-500 text-sm rounded-lg px-3 py-2 outline-none">
                    <option>All status</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-xs border-b border-gray-50">
                            <th className="py-3 font-medium">Employees Name</th>
                            <th className="py-3 font-medium">Job Title</th>
                            <th className="py-3 font-medium">Line Manager</th>
                            <th className="py-3 font-medium">Department</th>
                            <th className="py-3 font-medium">Office</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {members.map((member) => (
                            <tr key={member.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-900">{member.name}</td>
                                <td className="py-4 text-gray-500">{member.role}</td>
                                <td className="py-4 text-gray-500">{member.manager}</td>
                                <td className="py-4 text-gray-500">{member.department}</td>
                                <td className="py-4 text-gray-500">{member.office}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
