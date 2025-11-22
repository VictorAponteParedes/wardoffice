import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Developers', value: 85, color: '#4c1d95' },
    { name: 'Designers', value: 45, color: '#c4b5fd' },
    { name: 'Marketing', value: 15, color: '#ddd6fe' },
];

export const EmployeesDonutChart = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Total Employees</h3>
                <button className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50">
                    All Member
                </button>
            </div>

            <div className="relative h-[200px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-900">145</span>
                    <span className="text-xs text-gray-400">Total Miembros.</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-900"></span>
                    <span className="text-gray-600">Miembros</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                    <span className="text-gray-600">Graphic Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-100"></span>
                    <span className="text-gray-600">Digital Marketing</span>
                </div>
            </div>
        </div>
    );
};
