// import React, { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { Bookmark } from 'lucide-react';
// import { Avatar, AvatarImage } from '../ui/avatar';
// import { Badge } from '../ui/badge';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Job = ({ jobId }) => {
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);

//   // Fetch job data using Axios when the component is mounted
//   useEffect(() => {
//     // Assuming your API endpoint is something like: 'http://localhost:5000/api/jobs/{jobId}'
//     axios.get(`http://localhost:8081/api/jobs/${jobId}`)
//       .then((response) => {
//         setJob(response.data);  // Store the job data in the state
//       })
//       .catch((error) => {
//         console.error("Error fetching job data:", error);
//       });
//   }, [jobId]);  // Re-fetch if the jobId changes

//   // If job data is not yet loaded, return a loading state
//   if (!job) {
//     return <div>Loading...</div>;
//   }

//   const goToJobDescription = () => {
//     navigate('/job-description', { state: { singleJob: job } });
//   };

//   const daysAgoFunction = (mysqlTime) => {
//     const createdAt = new Date(mysqlTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div className="p-5 rounded-nd shadow-xl bg-white border border-gray-100">
//       <div className="flex items-center justify-between">
//         <p className='text-sm text-gray-500'>
//           {job?.createdAt ? (daysAgoFunction(job.createdAt) === 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`) : 'Unknown'}
//         </p>
//         <Button variant="outline" className="rounded-full" size="icon">
//           <Bookmark />
//         </Button>
//       </div>

//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6" variant="outline" size="icon">
//           <Avatar>
//             <AvatarImage src={job?.companyLogo || "https://www.shutterstock.com/shutterstock/photos/2346756545/display_1500/stock-vector-letter-c-abstract-logo-design-with-family-combination-in-colorful-design-2346756545.jpg"} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-medium text-lg">{job.companyName}</h1>
//           <p className="text-sm text-gray-500">{job.title}</p>
//         </div>
//       </div>

//       <div>
//         <h1 className="font-bold text-lg my-2">{job.title}</h1>
//         <p className="text-sm text-gray-600">{job.description}</p>
//       </div>

//       <div className="flex items-center gap-2 mt-4">
//         <Badge className="text-blue-700 font-bold" variant="ghost">
//           {job.positions} Positions
//         </Badge>
//         <Badge className="text-[#F83002] font-bold" variant="ghost">
//           {job.jobType}
//         </Badge>
//         <Badge className="text-[#7209b7] font-bold" variant="ghost">
//           {job.salary}
//         </Badge>
//       </div>

//       <div className="flex items-center gap-4 mt-4">
//         <Button variant="outline" onClick={goToJobDescription}>Details</Button>
//         <Button className="bg-[#7209b7]">Save For Later</Button>
//       </div>
//     </div>
//   );
// };

// export default Job;
































import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  

  useEffect(() => {
    axios
      .get("http://localhost:8081/Job/all")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching jobs:", error);
        setError("Failed to fetch jobs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {jobs.map((job) => (
        <div key={job.id} className="p-5 rounded-lg shadow-xl bg-white border border-gray-100">
          <div className="flex items-center justify-between">
            <p className='text-sm text-gray-500'>{job.createdAt || 'New Job'}</p>
            <Button variant="outline" className="rounded-full" size="icon">
              <Bookmark />
            </Button>
          </div>

          <div className="my-2">
            <h1 className="font-medium text-lg">{job.companyName || "Unknown Company"}</h1>
            <p className="text-sm text-gray-500">{job.jobsTitle}</p>
          </div>

          <div>
            <h1 className="font-bold text-lg my-2">{job.jobsTitle}</h1>
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {job.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {job.salary}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mt-4">
          <Button variant="outline" onClick={() => navigate(`/user/Jobform/${job.id}`)}>
  Apply
</Button>
            {/* <Button className="bg-[#7209b7]">Save For Later</Button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Job;
