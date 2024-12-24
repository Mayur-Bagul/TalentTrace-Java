/*import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job'; 
import JobApplicationForm from './JobApplicationForm';  */

import React, {useEffect, useState } from 'react';
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import JobApplicationForm from "./JobApplicationForm";
import jobService from '@/service/jobService';
import { toast } from 'react-toastify';




const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    jobService.getAllJobApplications()
      .then(data => setJobs(data))
      .catch(error => toast.error('Error fetching job applications'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddJob = (job) => {
    jobService.addJobApplication(job)
      .then(response => {
        toast.success('Job application added successfully!');
        setJobs((prevJobs) => [...prevJobs, response]);
      })
      .catch(error => toast.error('Error adding job application'));
  };

  const handleUpdateJob = (id, job) => {
    jobService.updateJobApplication(id, job)
      .then(response => {
        toast.success('Job application updated successfully!');
        setJobs((prevJobs) => prevJobs.map(j => j.id === id ? response : j));
      })
      .catch(error => toast.error('Error updating job application'));
  };

  const handleDeleteJob = (id) => {
    jobService.deleteJobApplication(id)
      .then(response => {
        toast.success('Job application deleted successfully!');
        setJobs((prevJobs) => prevJobs.filter(j => j.id !== id));
      })
      .catch(error => toast.error('Error deleting job application'));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {loading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : jobs.length === 0 ? (
              <span>No jobs found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <div key={job.id}>
                    <Job job={job} onApply={() => handleAddJob(job)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
