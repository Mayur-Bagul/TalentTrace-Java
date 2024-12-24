import React from 'react'
import { motion } from 'framer-motion'
import Header from '../common_components/Header'
import AnalyticsStatCards from '../analytics/AnalyticsStatCards'
import RevenueChart from '../analytics/JobAnalyticChart'
import AIPoweredInsights from '../analytics/AIPoweredInsights'

const AnalyticsPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title="Analytics Dashboard" />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <AnalyticsStatCards />

                <RevenueChart />

                <div className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <AIPoweredInsights />
                </div>


                
            </main>


        </div>
    )
}

export default AnalyticsPage
