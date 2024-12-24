import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Applicants = () => {
  const { id } = useParams(); // Get job ID from URL params
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true); // Set loading to true when starting the fetch
        const response = await axios.get(`http://localhost:8081/Job/{id}/app/`); // Fetch applicants by job ID
        setApplicants(response.data); // Set applicants to state
      } catch (err) {
        console.error('Error fetching applicants:', err);
        setError('Could not fetch applicants. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchApplicants();
  }, [id]); // Dependency array with `id` to refetch when the job ID changes

  if (loading) {
    return <div>Loading applicants...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.length})
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default Applicants;
