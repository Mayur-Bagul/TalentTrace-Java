// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { MoreHorizontal } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = ({ jobId }) => {
//   const [applicants, setApplicants] = useState([]);

//   // Fetch applicants data from the database when the component is mounted
//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8081/api/applications/get/${params.id}`);
//         setApplicants(response.data); // Set applicants from API response
//       } catch (error) {
//         toast.error('Failed to fetch applicants');
//       }
//     };

//     fetchApplicants();
//   }, [jobId]);

//   // Update applicant status in the database
//   const statusHandler = async (status, applicantId) => {
//     try {
//       await axios.put(`http://localhost:8081/api/jobs/${jobId}/applicants/${applicantId}/status`, {
//         status, // New status to update
//       });

//       // Update the local state after a successful status update
//       setApplicants(prevApplicants =>
//         prevApplicants.map(applicant => 
//           applicant._id === applicantId ? { ...applicant, status } : applicant
//         )
//       );

//       toast.success(`Applicant status updated to ${status}`);
//     } catch (error) {
//       toast.error('Failed to update applicant status');
//     }
//   };

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applied users</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Full Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants.length > 0 ? (
//             applicants.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                 <TableCell>
//                   {item.applicant?.profile?.resume ? (
//                     <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
//                       {item?.applicant?.profile?.resumeOriginalName}
//                     </a>
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>
//                 <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {shortlistingStatus.map((status, index) => (
//                         <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
//                           <span>{status}</span>
//                         </div>
//                       ))}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan="6" className="text-center">No applicants found</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ApplicantsTable;































import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const shortlistingStatus = ["Applied","Accepted", "Rejected", "Reviewed", "Pending"];

const ApplicantsTable = () => {
  const { jobId } = useParams(); // Get job ID from URL params
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) {
        console.error('Error: jobId is undefined');
        toast.error('Job ID is missing');
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:5140/api/JobApplication/GetJobApplicationById/${jobId}`);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        toast.error('Failed to fetch applicants');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const statusHandler = async (status, applicationId) => {
    try {
      await axios.put(`http://localhost:5140/api/Jobs/${jobId}/applicants/${applicationId}/status`, { status1: status });
      
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicationId ? { ...applicant, status } : applicant
        )
      );

      toast.success(`Application status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update applicant status');
    }
  };

  return (
    <div className="shadow-lg border border-gray-300 rounded-lg bg-white p-4">
      <Table>
        <TableCaption>List of applicants for this job</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Cover Letter</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan="7" className="text-center py-4">Loading...</TableCell>
            </TableRow>
          ) : applicants.length > 0 ? (
            applicants.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.email}</TableCell>
                <TableCell className="text-center">{item.coverLetter || "N/A"}</TableCell>
                
                <TableCell className="text-center">
                  <span className={`px-2 py-1 rounded-lg text-white ${
                    item.status === "Applied" ? "bg-blue-500" :
                    item.status === "Pending" ? "bg-yellow-500" :
                    item.status === "Reviewed" ? "bg-purple-500" :
                    item.status === "Accepted" ? "bg-green-500" :
                    item.status === "Rejected" ? "bg-red-500" : ""}
                  `}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item.id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-500"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center text-gray-500 py-4">No applicants found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;