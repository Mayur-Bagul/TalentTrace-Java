
import React, {useEffect, useState } from 'react';
import Navbar from "../shared/Navbar";
import Job from "./Job";
import JobApplicationForm from "./JobApplicationForm";
import jobService from '@/service/jobService';
import { toast } from 'react-toastify';

import UNavbar from '../shared/UserNav';



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

  const handleApplyNow = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

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
      <UNavbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* <div className="w-1/5"> */}
           
          </div>

          {/* Render Job component, which now fetches jobs independently */}
          <div className="flex-1 pb-5">
            <Job />
          </div>
        </div>
      </div>
    
  );
};

export default Jobs;
