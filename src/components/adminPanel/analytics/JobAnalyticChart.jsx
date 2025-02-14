import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import Navbar from '@/components/shared/Navbar';

const Analytics_Data = [
    { month: "Jan", JobApplications: 4200, JobPostings: 5000, ActiveUsers: 3500 },
    { month: "Feb", JobApplications: 3000, JobPostings: 3200, ActiveUsers: 3000 },
    { month: "Mar", JobApplications: 5500, JobPostings: 4500, ActiveUsers: 5000 },
    { month: "Apr", JobApplications: 4500, JobPostings: 4200, ActiveUsers: 4500 },
    { month: "May", JobApplications: 5500, JobPostings: 6000, ActiveUsers: 5000 },
    { month: "Jun", JobApplications: 4500, JobPostings: 4800, ActiveUsers: 4800 },
    { month: "Jul", JobApplications: 7000, JobPostings: 6500, ActiveUsers: 6500 },
];

const JobAnalyticsChart = () => {
    const [SelectedTimeRange, setSelectedTimeRange] = useState("This Quarter");

    return (
        <div>
            {/* <Navbar /> */}
        <motion.div
            className="bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 text-center lg:col-span-2 border border-gray-700"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold mb-4 text-gray-100'>
                    Job Applications, Postings & Active Users
                </h2>

                <select
                    className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600'
                    value={SelectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)} // Fixed e.target.value
                >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className='w-full h-80'>
                <ResponsiveContainer>
                    <AreaChart data={Analytics_Data}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey="month" stroke='#9ca3af' />
                        <YAxis stroke='#9ca3af' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4b5563",
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="JobApplications"
                            stroke='#8b5cf6'
                            fill='#8b5cf6'
                            fillOpacity={0.3}
                        />
                        <Area
                            type="monotone"
                            dataKey="JobPostings"
                            stroke='#10b981'
                            fill='#10b981'
                            fillOpacity={0.3}
                        />
                        <Area
                            type="monotone"
                            dataKey="ActiveUsers"
                            stroke='#f59e0b'
                            fill='#f59e0b'
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
        </div>
    );
};

export default JobAnalyticsChart;
