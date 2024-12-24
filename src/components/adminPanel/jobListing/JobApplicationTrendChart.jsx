import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

// Sample data for Job Applications (monthly trend)
const JobApplicationTrend_Data = [
    { month: "Jan", Applications: 150 },
    { month: "Feb", Applications: 120 },
    { month: "Mar", Applications: 200 },
    { month: "Apr", Applications: 170 },
    { month: "May", Applications: 250 },
    { month: "Jun", Applications: 220 },
    { month: "Jul", Applications: 300 },
]

const JobApplicationTrendChart = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Job Application Trend
            </h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width={'100%'} height={"100%"}>
                    <LineChart data={JobApplicationTrend_Data}>
                        <CartesianGrid strokeDasharray={'3 3'} stroke='#374151' />
                        <XAxis dataKey={"month"} stroke='#9ca3af' />
                        <YAxis stroke='#9ca3af' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 45, 55, 0.8)",
                                borderColor: "4b5563"
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                        />
                        <Line
                            type="monotone"
                            dataKey='Applications'
                            stroke='#8b5cf6'
                            strokeWidth={2}
                        />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default JobApplicationTrendChart
