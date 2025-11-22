import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'January', project: 40000, product: 24000 },
    { name: 'February', project: 30000, product: 13980 },
    { name: 'March', project: 20000, product: 58000 },
    { name: 'April', project: 27800, product: 39080 },
    { name: 'May', project: 18900, product: 48000 },
    { name: 'June', project: 23900, product: 38000 },
];

export const PerformanceChart = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Team Performance</h3>
                    <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-900"></span>
                            <span className="text-gray-500">Project Team</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            <span className="text-gray-500">Product Team</span>
                        </div>
                    </div>
                </div>
                <button className="text-sm text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                    Last 5 months
                </button>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barGap={8}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="project" fill="#4c1d95" radius={[4, 4, 4, 4]} barSize={12} />
                        <Bar dataKey="product" fill="#a78bfa" radius={[4, 4, 4, 4]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
