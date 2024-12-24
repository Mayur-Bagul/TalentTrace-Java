/*import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState("");  // Local state for search term
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/companies/all'); // Replace with your actual endpoint
        setCompanies(response.data);  // Store the fetched companies
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };
    
    fetchCompanies();
  }, []);

  // Filter companies based on search term
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true; // If no search term, show all companies
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <div className="flex justify-between my-4">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompanyByText}
          onChange={(e) => setSearchCompanyByText(e.target.value)}
          className="input input-bordered w-1/3"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/edit-companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;*/




///ERROR FOR THE DATE FORMAT IN THE TABLE



/*
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState(""); // Local state for search term
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/companies/all'); // Replace with your actual endpoint
        console.log("Fetched companies:", response.data);  // Debugging: Check the structure of the response
        setCompanies(response.data); // Store the fetched companies
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true; // If no search term, show all companies
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <div className="flex justify-between my-4">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompanyByText}
          onChange={(e) => setSearchCompanyByText(e.target.value)}
          className="input input-bordered w-1/3"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {/* Ensure createdAt exists and handle cases where it might be missing }
                {company.createdAt ? company.createdAt.split('T')[0] : "Date Not Available"}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/edit-companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
*/






/*

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState(""); // Local state for search term
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/companies/all'); // Replace with your actual endpoint
        setCompanies(response.data || []); // Store the fetched companies
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true; // If no search term, show all companies
      }
      return company?.name?.toLowerCase()?.includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <div className="flex justify-between my-4">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompanyByText}
          onChange={(e) => setSearchCompanyByText(e.target.value)}
          className="input input-bordered w-1/3"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map((company) => (
            <TableRow key={company._id || Math.random()}>
              <TableCell>{company?.name || "N/A"}</TableCell>
              <TableCell>
                {company?.createdAt ? company.createdAt.split('T')[0] : "N/A"}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/edit-companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
*/


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState(""); // Local state for search term
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/companies/all'); // Replace with your actual endpoint
        console.log("Fetched companies:", response.data);  // Debugging: Check the structure of the response
        setCompanies(response.data); // Store the fetched companies
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true; // If no search term, show all companies
      }
      return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <div className="flex justify-between my-4">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompanyByText}
          onChange={(e) => setSearchCompanyByText(e.target.value)}
          className="input input-bordered w-1/3"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead> {/* Replaced Date with Location */}
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>
                {/* Ensure location exists and display it properly */}
                {company.location || "Location Not Available"} {/* Default text in case location is missing */}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/setCompanies/${company.id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
