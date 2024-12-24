import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import { setSearchJobByText } from '@/redux/jobSlice';
import PostJob from './PostJob';
import CompanyCreate from './CompanyCreate';
import axios from 'axios';

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the backend (API) when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/Job/all`);
        setJobs(response.data);  // Store jobs in state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on the input value
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  // Filter jobs based on the search input
  const filteredJobs = jobs.filter((job) =>
    job.jobsTitle.toLowerCase().includes(input.toLowerCase()) ||
    job.role.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/postjobs')}>New Jobs</Button>
        </div>
        {/* Pass filtered jobs to the table */}
        <AdminJobsTable jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default AdminJobs;
