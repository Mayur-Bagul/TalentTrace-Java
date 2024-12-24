import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, Package, TrendingUp } from 'lucide-react';

import Header from '../common_components/Header';
import StatCards from '../common_components/StatCards';
import JobTable from '../jobListing/JobTable'; // Importing the updated JobTable
import JobApplicationTrendChart from "../jobListing/JobApplicationTrendChart";
import CategoryDistributionChart from '../overview/CategoryDistributionChart'; // Category Distribution Chart

const JobPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
      <Header title="Job Listings" /> {/* Updated title for Job Portal */}

      {/* STAT DATA */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCards name="Total Jobs" icon={Package} value="432" color="#6366f1" /> {/* Total Jobs */}
          <StatCards name="New Applications" icon={TrendingUp} value="69" color="#10b981" /> {/* New Applications */}
          <StatCards name="Urgent Openings" icon={AlertTriangle} value="32" color="#f59e0b" /> {/* Urgent Openings */}
          <StatCards name="Total Revenue" icon={DollarSign} value="$654,310" color="#ef4444" /> {/* Total Revenue, can be related to job posting fees */}
        </motion.div>

        {/* JOB TABLE */}
        <JobTable /> {/* Job listing table */}

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <JobApplicationTrendChart /> {/* Job Application Trend Chart */}
          <CategoryDistributionChart /> {/* Category Distribution Chart */}
        </div>
      </main>
    </div>
  );
};

export default JobPage;
