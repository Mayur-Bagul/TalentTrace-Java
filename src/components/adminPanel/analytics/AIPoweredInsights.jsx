import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clipboard, TrendingUp, Briefcase } from 'lucide-react';

const INSIGHTS = [
    {
        icon: TrendingUp,
        color: "text-green-500",
        insight: "Job applications have increased by 20% compared to last month, signaling strong job seeker interest.",
    },
    {
        icon: Users,
        color: "text-blue-500",
        insight: "Active user engagement on the platform is up 15%, driven by the recent update in search functionality.",
    },
    {
        icon: Clipboard,
        color: "text-purple-500",
        insight: 'The "Software Engineering" category is seeing the highest number of job applications this quarter.',
    },
    {
        icon: Briefcase,
        color: "text-yellow-500",
        insight: "Employers are posting 10% more jobs on the platform, particularly in the tech and finance sectors.",
    },
];

const AIPoweredInsights = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>
                AI Powered Insights
            </h2>

            <div className='space-y-4'>
                {INSIGHTS.map((item, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                        <div className={`p-2 rounded-full bg-opacity-20 ${item.color}`}>
                            <item.icon className={`size-[22px] ${item.color}`} />
                        </div>
                        <p className='text-gray-300'>{item.insight}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default AIPoweredInsights;
