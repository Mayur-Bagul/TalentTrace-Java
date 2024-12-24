import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const JobApplicationSourcesData = [
    { name: "Job Board", Value: 6200 },
    { name: "Company Website", Value: 5400 },
    { name: "Social Media", Value: 4300 },
    { name: "Referrals", Value: 3200 },
    { name: "Recruitment Agency", Value: 2800 },
    { name: "Career Fair", Value: 3700 },
    { name: "Direct Applications", Value: 4000 },
];

const COLORS = ["#6366f1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6", "#6EE7B7"];

const JobApplicationsChart = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 lg:col-span-2 border border-gray-700'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Applications by Source
            </h2>

            <div className='h-80'>
                <ResponsiveContainer>
                    <BarChart data={JobApplicationSourcesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
                        <XAxis dataKey="name" stroke='#9ca3af' />
                        <YAxis stroke='#9ca3af' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4b5563",
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                        />
                        <Legend /> {/* Remove this if you want to hide the "Value" text at the bottom */}
                        <Bar dataKey={"Value"} fill='#8884d8'>
                            {JobApplicationSourcesData.map((item, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default JobApplicationsChart;
