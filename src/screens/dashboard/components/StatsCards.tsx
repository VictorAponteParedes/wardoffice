import React from "react";
import { Users, Briefcase, UserPlus, UserMinus, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    trend: "up" | "down";
    trendValue: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

const StatCard = ({ title, value, subtext, trend, trendValue, icon, iconBg, iconColor }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trendValue}
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
            </div>
        </div>
    );
};

export const StatsCards = () => {
    const stats = [
        {
            title: "Total employees",
            value: "4510",
            subtext: "Total employees",
            trend: "up" as const,
            trendValue: "20.5%",
            icon: <Users className="w-6 h-6" />,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            title: "Job applicants",
            value: "1450",
            subtext: "Job applicants",
            trend: "down" as const,
            trendValue: "12.5%",
            icon: <Briefcase className="w-6 h-6" />,
            iconBg: "bg-pink-50",
            iconColor: "text-pink-600"
        },
        {
            title: "New Members",
            value: "4510",
            subtext: "New Members",
            trend: "down" as const,
            trendValue: "15.5%",
            icon: <UserPlus className="w-6 h-6" />,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            title: "Resigned members",
            value: "4510",
            subtext: "Resigned members",
            trend: "up" as const,
            trendValue: "20.5%",
            icon: <UserMinus className="w-6 h-6" />,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};
