

// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminJobsTable = () => {
//   const navigate = useNavigate();
//   const [filterJobs, setFilterJobs] = useState([]);
//   const [searchJobByText, setSearchJobByText] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//         try {
//             const response = await axios.get('http://localhost:8081/Job/all');
//             setFilterJobs(response.data);
//         } catch (error) {
//             console.error('Error fetching jobs:', error);
//         }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     const filteredJobs = filterJobs.filter((job) => {
//       if (!searchJobByText) {
//           return true;
//       }
//       return (
//           job?.jobsTitle?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//           job?.jobid?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase())
//       );
//     });
//   }, []);

//   const deleteJob = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/Job/jobs/${id}`);
//       setFilterJobs(filterJobs.filter(job => job.id !== id));
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by Job Title or Company"
//           value={searchJobByText}
//           onChange={(e) => setSearchJobByText(e.target.value)}
//           className="input input-bordered w-full max-w-xs"
//         />
//       </div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Location</TableHead>
//             <TableHead>Salary</TableHead>
//             <TableHead>Experience</TableHead>
//             <TableHead>Skills</TableHead>
//             <TableHead>Action</TableHead>
//             <TableHead className="text-right"></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//   {filterJobs.length > 0 ? (
//     filterJobs.map((job) => (
//       <TableRow key={job.id}>
//         <TableCell>{job?.companyName || 'N/A'}</TableCell>
//         <TableCell>{job?.jobsTitle}</TableCell>
//         <TableCell>{job?.description}</TableCell>
//         <TableCell>{job?.location}</TableCell>
//         <TableCell>{job?.salary}</TableCell>
//         <TableCell>{job?.experience}</TableCell>
//         <TableCell>{job?.requirements}</TableCell>
//         <TableCell className="text-right cursor-pointer">
//           <Popover>
//             <PopoverTrigger>
//               <MoreHorizontal />
//             </PopoverTrigger>
//             <PopoverContent className="w-32">
//             <div
//                  onClick={() => navigate(`/updatejob/${job.id}`)}
//                 className="flex items-center gap-2 w-fit cursor-pointer"
//               >
//                <Edit2 className="w-4" />
//                <span>Edit</span>
//             </div>
//               <div
//                 onClick={() => navigate(`/jobs/${job.id}/applicants`)}
//                 className="flex items-center w-fit gap-2 cursor-pointer mt-2"
//               >
//                 <Eye className="w-4" />
//                 <span>Applicants</span>
//               </div>
//               <div
//                 onClick={() => deleteJob(job.id)}
//                 className="flex items-center w-fit gap-2 cursor-pointer text-red-500 mt-2"
//               >
//                 <Trash2 className="w-4" />
//                 <span>Delete</span>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan="4" className="text-center">
//         No jobs found.
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;





































import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);
  const [searchJobByText, setSearchJobByText] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Job/all');
        setFilterJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/Job/jobs/${id}`);
      setFilterJobs(filterJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
      <h2 className="text-lg font-semibold text-center mb-4">List of Posted Jobs</h2>
      <div className="mb-4">
        {/* <input
          type="text"
          placeholder="Search by Job Title or Company"
          value={searchJobByText}
          onChange={(e) => setSearchJobByText(e.target.value)}
          className="input input-bordered w-full max-w-xs border border-gray-300 rounded-md p-2"
        /> */}
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center border-b">Company Name</TableHead>
              <TableHead className="text-center border-b">Title</TableHead>
              <TableHead className="text-center border-b">Description</TableHead>
              <TableHead className="text-center border-b">Location</TableHead>
              <TableHead className="text-center border-b">Salary</TableHead>
              <TableHead className="text-center border-b">Experience</TableHead>
              <TableHead className="text-center border-b">Skills</TableHead>
              <TableHead className="text-center border-b">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs.length > 0 ? (
              filterJobs.map((job, index) => (
                <TableRow key={job.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <TableCell className="text-center border-b">{job?.companyName || 'N/A'}</TableCell>
                  <TableCell className="text-center border-b">{job?.jobsTitle}</TableCell>
                  <TableCell className="text-center border-b">{job?.description}</TableCell>
                  <TableCell className="text-center border-b">{job?.location}</TableCell>
                  <TableCell className="text-center border-b">{job?.salary}</TableCell>
                  <TableCell className="text-center border-b">{job?.experience}</TableCell>
                  <TableCell className="text-center border-b">{job?.requirements}</TableCell>
                  <TableCell className="text-center border-b cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() => navigate(`/updatejob/${job.id}`)}
                          className="flex items-center gap-2 w-fit cursor-pointer text-blue-500"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        {/* <div
                          onClick={() => navigate(`/jobs/${job.id}/applicants`)}
                          className="flex items-center w-fit gap-2 cursor-pointer text-green-500 mt-2"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div> */}
                        <div
                          onClick={() => deleteJob(job.id)}
                          className="flex items-center gap-2 w-fit cursor-pointer text-red-500 mt-2"
                        >
                          <Trash2 className="w-4" />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center py-4 border-b">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
