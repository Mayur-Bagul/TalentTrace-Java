import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]); // State for filtered jobs
  const [searchJobByText, setSearchJobByText] = useState(''); // Search input state

  // Fetch jobs from the database when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8081/Job/all');
            console.log("Fetched jobs:", response.data); // Verify companyName here
            setFilterJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };
    fetchJobs();
}, []);

   // Empty dependency array means this effect runs once when component mounts

  // Filter jobs based on the search input
  useEffect(() => {
    const filteredJobs = filterJobs.filter((job) => {
      if (!searchJobByText) {
          return true;
      }
      return (
          job?.jobsTitle?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.jobid?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    }
  );
   // setFilterJobs(filteredJobs); // Update state with filtered jobs
  }, //[searchJobByText, filterJobs]
  ); // Re-run the filter whenever the search term changes

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Job Title or Company"
          value={searchJobByText}
          onChange={(e) => setSearchJobByText(e.target.value)} // Update search term
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {filterJobs.length > 0 ? (
    filterJobs.map((job) => (
      <TableRow key={job.id}>
        {/* Update this line based on the correct path */}
        <TableCell>{job?.companyName || 'N/A'}</TableCell>
        <TableCell>{job?.jobsTitle}</TableCell>
        <TableCell>{job?.location}</TableCell>
        <TableCell className="text-right cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-32">
            <div
                 onClick={() => navigate(`/updatejob/${job.id}`)} // Update path to `updatejob`
                className="flex items-center gap-2 w-fit cursor-pointer"
              >
               <Edit2 className="w-4" />
               <span>Edit</span>
            </div>

              <div
                onClick={() => navigate(`/jobs/${job.id}/applicants`)}
                className="flex items-center w-fit gap-2 cursor-pointer mt-2"
              >
                <Eye className="w-4" />
                <span>Applicants</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan="4" className="text-center">
        No jobs found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </div>
  );
};

export default AdminJobsTable;
