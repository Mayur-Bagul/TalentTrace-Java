import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const JobApplicationsData = [
    { name: "Aug", Applications: 1200 },
    { name: "Sep", Applications: 1500 },
    { name: "Oct", Applications: 2000 },
    { name: "Nov", Applications: 1800 },
    { name: "Dec", Applications: 2200 },
    { name: "Jan", Applications: 3000 },
    { name: "Feb", Applications: 2700 },
    { name: "Mar", Applications: 2500 },
    { name: "Apr", Applications: 3100 },
    { name: "May", Applications: 2900 },
    { name: "Jun", Applications: 3300 },
    { name: "Jul", Applications: 3600 },
]

const ApplicationsOverviewChart = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Monthly Job Applications Overview
            </h2>

            <div className='h-80'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={JobApplicationsData}>
                        <CartesianGrid strokeDasharray={'3 3'} stroke='#4b5563' />
                        <XAxis dataKey={"name"} stroke='#9ca3af' />
                        <YAxis stroke='#9ca3af' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 45, 55, 0.8)",
                                borderColor: "#4b5563"
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                        />
                        <Line
                            type="monotone"
                            dataKey='Applications'
                            stroke='#6366f1'
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 8, strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default ApplicationsOverviewChart
