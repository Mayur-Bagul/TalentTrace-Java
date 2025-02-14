// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import ApplicantsTable from './ApplicantsTable';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Applicants = () => {
//   const { id } = useParams(); // Get job ID from URL params
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         setLoading(true); // Set loading to true when starting the fetch
//         const response = await axios.get(`http://localhost:8081/Job/{id}/app/`); // Fetch applicants by job ID
//         setApplicants(response.data); // Set applicants to state
//       } catch (err) {
//         console.error('Error fetching applicants:', err);
//         setError('Could not fetch applicants. Please try again later.'); // Set error message
//       } finally {
//         setLoading(false); // Set loading to false when the fetch is complete
//       }
//     };

//     fetchApplicants();
//   }, [id]); // Dependency array with `id` to refetch when the job ID changes

//   if (loading) {
//     return <div>Loading applicants...</div>; // Display loading message
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="font-bold text-xl my-5">
//           Applicants ({applicants?.length})
//         </h1>
//         <ApplicantsTable applicants={applicants} />
//       </div>
//     </div>
//   );
// };

// export default Applicants;















import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'react-toastify';
import RNavbar from '../shared/Recruiter_nav';

const jobStatuses = ["Applied", "Pending", "Reviewed", "Accepted", "Rejected"];

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8081/api/applications/all');
        setApplicants(response.data);
      } catch (err) {
        console.error('Error fetching applicants:', err);
        setError('Could not fetch applicants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const updateStatus = async (jobId, applicationId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8081/api/applications//update/status/${applicationId}`,
        { newStatus },
        {
          headers: { Authorization: `Bearer ${""}` }, // Replace with actual token
        }
      );

      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicationId ? { ...applicant, status: newStatus } : applicant
        )
      );

      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update applicant status');
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading applicants...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <RNavbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="font-bold text-xl mb-5">All Job Applications ({applicants.length})</h1>

        <div className="shadow-lg border border-gray-300 rounded-lg bg-white">
          <Table>
            <TableCaption>List of all job applications</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                {/* <TableHead className="text-center">Job Title</TableHead> */}
                <TableHead className="text-center">LinkedIn</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                applicants.map((applicant, index) => (
                  <TableRow key={applicant.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <TableCell className="text-center border-b">{applicant.name}</TableCell>
                    <TableCell className="text-center border-b">{applicant.email}</TableCell>
                    {/* <TableCell className="text-center border-b">{applicant.jobsTitle || 'N/A'}</TableCell> */}
                    <TableCell className="text-center border-b">{applicant.coverLetter || 'N/A'}</TableCell>
                    <TableCell className="text-center border-b">{applicant.status}</TableCell>
                    {/* <TableCell className="text-center border-b">
                      <span className={`px-2 py-1 rounded-lg text-white 
                        ${applicant.status === 'Applied' ? 'bg-blue-500' : ''}
                        ${applicant.status === 'Pending' ? 'bg-yellow-500' : ''}
                        ${applicant.status === 'Reviewed' ? 'bg-purple-500' : ''}
                        ${applicant.status === 'Accepted' ? 'bg-green-500' : ''}
                        ${applicant.status === 'Rejected' ? 'bg-red-500' : ''}`}>
                        {applicant.status}
                      </span>
                    </TableCell> */}
                    <TableCell className="text-center border-b">
                      <select
                        value={applicant.status}
                        onChange={(e) => updateStatus(applicant.jobId, applicant.id, e.target.value)}
                        className="border p-2 rounded"
                      >
                        {jobStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
