import React from 'react'
import { motion } from 'framer-motion'
import { UserCheck, UserIcon, UserPlus, UserX } from 'lucide-react'


import Header from '../common_components/Header'
import StatCards from '../common_components/StatCards'

import UsersPageTable from '../users/UsersPageTable'


const Users_Stat = {
    totalUsers: 4504,
    newUsersToday: 243,
    activeUsers: 23091,
    churnRate: "2.3%",
} 

const UsersPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title="Users" />


            {/* STAT DATA  */}
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCards name="Total Users" icon={UserIcon} value={Users_Stat.totalUsers.toLocaleString()} color="#6366f1" />
                    <StatCards name="New Users Today" icon={UserPlus} value={Users_Stat.newUsersToday} color="#10b981" />
                    <StatCards name="Active Users" icon={UserCheck} value={Users_Stat.activeUsers.toLocaleString()} color="#f59e0b" />
                    <StatCards name="Churn Rate" icon={UserX} value={Users_Stat.churnRate} color="#ef4444" />
                </motion.div>

                
                    {/* USER DATA  */}

                <UsersPageTable />
                
                    {/* USERS CHARTS  */}

               
            </main>
        </div>
    )
}

export default UsersPage
