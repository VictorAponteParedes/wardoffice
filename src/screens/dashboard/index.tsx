// src/pages/dashboard/Dashboard.tsx
import { motion } from "framer-motion";
import WardLayout from "../../layouts/WardLayout";
import { StatsCards } from "./components/StatsCards";
import { PerformanceChart } from "./components/PerformanceChart";
import { EmployeesDonutChart } from "./components/EmployeesDonutChart";
import { RecentMembersList } from "./components/RecentMembersList";

export default function Dashboard() {

    return (
        <WardLayout>
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <StatsCards />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <PerformanceChart />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <EmployeesDonutChart />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <RecentMembersList />
                </motion.div>
            </div>
        </WardLayout>
    );
}