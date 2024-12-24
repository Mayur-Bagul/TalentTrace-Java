import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Category_Data = [
    { name: "Software Development", value: 5000 },
    { name: "Marketing", value: 3000 },
    { name: "Sales", value: 2500 },
    { name: "Human Resources", value: 1800 },
    { name: "Customer Support", value: 2000 },
];


const COLORS = ["#6366f1", "#6b8afa", "#ec4899", "#10b981", "#f59e0b"];


const CategoryDistributionChart = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Category Distribution
            </h2>

            <div className='h-80'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <PieChart>
                        <Pie
                            data={Category_Data}
                            cx={"50%"}
                            cy={"50%"}
                            labelLine={false}
                            outerRadius={80}
                            fill='#8884d8'
                            dataKey="value"
                            label= {({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {Category_Data.map((item, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4b5563",
                            }}
                            itemStyle={{color: "#e5e7eb"}}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default CategoryDistributionChart