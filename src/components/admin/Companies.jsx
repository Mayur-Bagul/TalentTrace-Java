
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Companies = () => {
  const [input, setInput] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch companies from the backend using Axios
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/companies/all'); // Assuming this endpoint exists
        setCompanies(response.data); // Set the companies data from the API response
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    // Filter companies based on the input search term
    const filtered = companies.filter(company =>
      company?.name?.toLowerCase()?.includes(input.toLowerCase()) || false
    );

    setFilteredCompanies(filtered);
  }, [input, companies]); // Run this effect when companies data or input changes

  return (
    <div>
         <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/set-companies")}>New Company</Button>
        </div>
        <CompaniesTable companies={filteredCompanies} />
      </div>
    </div>
  );
};

export default Companies;

