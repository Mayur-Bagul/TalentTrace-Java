import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Companies from './Companies';
import axios from 'axios';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
  
    // Save new company in MySQL database through API
    const registerNewCompany = async () => {
      if (!companyName) {
        toast.error("Company name is required!");
        return;
      }
  
      try {
        // Creating a new company object to send to the backend
        const newCompany = {
          name: companyName,
          createdAt: new Date().toISOString(),
          logo: "", // Placeholder for logo (can be added later)
        };
  
        // Send the new company data to the backend using Axios
        const response = await axios.post('http://localhost:8081/companies/add', newCompany); // Replace with your actual API endpoint
  
        if (response.status === 201) {
          // Successfully created company
          toast.success("Company registered successfully!");
  
          // Navigate to the companies page (or the created company page if needed)
          navigate('/companies');
        }
      } catch (error) {
        console.error("Error registering company:", error);
        toast.error("Failed to register company");
      }
    };
  
    return (
      <div>
        <Navbar />
        <div className='max-w-4xl mx-auto'>
          <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
          </div>
  
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft, etc."
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
          <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={() => navigate("/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany}>Continue</Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CompanyCreate;
  