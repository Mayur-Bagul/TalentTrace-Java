// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setNewApplication } from '@/redux/jobSlice';
// import JobApplicationForm from './JobApplicationForm';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { toast } from 'react-toastify';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const JobDescription = () => {
//     const { id } = useParams();  
//     const [job, setJob] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchJobDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/api/jobs/${jobId}`);
//                 setJob(response.data);  // Set job data to state
//             } catch (err) {
//                 setError(err.message || 'Failed to fetch job details');
//                 toast.error(err.message || 'Failed to fetch job details');
//                 navigate('/jobs');  // Navigate to jobs list if the job is not found
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchJobDetails();
//         }
//     }, [id, navigate]);

//     const handleApplyNow = () => {
//         setShowForm(true);
//     };

//     const handleCloseForm = () => {
//         setShowForm(false);
//     };

//     const handleFormSubmit = async (formData) => {
//         const application = { ...formData, jobTitle: job.title, jobId: job.jobId, jobId: Date.now() };

//         try {
//             // Submit the application to the backend
//             const response = await axios.post('http://localhost:8081/api/applications/add', application);
//             dispatch(setNewApplication(response.data));  // Dispatch to Redux store if needed
//             toast.success("Application submitted successfully!");
//             setShowForm(false);  // Close the form after submission
//         } catch (err) {
//             console.error("Error submitting application:", err);
//             toast.error("Failed to submit application.");
//         }
//     };

//     if (loading) return <div>Loading job details...</div>;

//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="max-w-7xl mx-auto my-10">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="font-bold text-xl">{job.jobsTitle} - Job Description</h1>
//                     <h2 className="text-lg font-semibold text-gray-700">Company: {job.companyName}</h2>

//                     <div className="flex items-center gap-2 mt-4">
//                         <Badge className="text-blue-700 font-bold" variant="ghost">
//                             {job.position} Positions
//                         </Badge>
//                         <Badge className="text-[#F83002] font-bold" variant="ghost">
//                             {job.jobType}
//                         </Badge>
//                         <Badge className="text-[#7209b7] font-bold" variant="ghost">
//                             {job.salary}
//                         </Badge>
//                     </div>
//                 </div>
//                 <Button className="bg-[#7209b7]" onClick={handleApplyNow}>Apply Now</Button>
//             </div>

//             <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
//             <div className="my-4">
//                 <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{job.jobsTitle}</span></h1>
//                 <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{job.companyName}</span></h1>
//                 <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{job.description}</span></h1>
//                 <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{job.experience || '0-3 yrs'}</span></h1>
//                 <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{job.salary}</span></h1>
//                 {/* <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{job.applicantCount}</span></h1> */}
//                 <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{new Date(job.postedDate).toLocaleDateString()}</span></h1>
//             </div>

//             {showForm && (
//                 <JobApplicationForm
//                     job={job}
//                     onSubmit={handleFormSubmit}
//                     onClose={handleCloseForm}
//                 />
//             )}
//         </div>
//     );
// };

// export default JobDescription;





















































// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setNewApplication } from '@/redux/jobSlice';
// import JobApplicationForm from './JobApplicationForm';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { toast } from 'react-toastify';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const JobDescription = () => {
//     const { id: jobId } = useParams();  
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!jobId) {
//             setError("Invalid Job ID");
//             setLoading(false);
//             return;
//         }

//         const fetchJobDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/Job/all`);
//                 const jobData = response.data.find(job => job.jobId.toString() === jobId);
                
//                 if (!jobData) {
//                     throw new Error("Job not found");
//                 }

//                 setJob(jobData);
//             } catch (err) {
//                 console.error("❌ Error fetching job details:", err);
//                 setError(err.message || "Failed to fetch job details");
//                 toast.error(err.message || "Failed to fetch job details");
//                 navigate('/jobs');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobDetails();
//     }, [jobId, navigate]);

//     const handleApplyNow = () => setShowForm(true);
//     const handleCloseForm = () => setShowForm(false);

//     if (loading) return <div className="text-center text-lg font-bold">Loading job details...</div>;
//     if (error) return <div className="text-red-500 text-center font-semibold">{error}</div>;

//     return (
//         <div className="max-w-7xl mx-auto my-10 p-5 shadow-md bg-white rounded-lg">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="font-bold text-xl">{job.jobTitle} - Job Description</h1>
//                     <h2 className="text-lg font-semibold text-gray-700">Company: {job.companyName}</h2>
//                     <div className="flex items-center gap-2 mt-4">
//                         <Badge className="text-blue-700 font-bold" variant="ghost">
//                             {job.position} Positions
//                         </Badge>
//                         <Badge className="text-[#F83002] font-bold" variant="ghost">
//                             {job.jobType}
//                         </Badge>
//                         <Badge className="text-[#7209b7] font-bold" variant="ghost">
//                             {job.salary}
//                         </Badge>
//                     </div>
//                 </div>
//                 <Button className="bg-[#7209b7]" onClick={handleApplyNow}>Apply Now</Button>
//             </div>

//             <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Details</h1>
//             <div className="my-4 space-y-2">
//                 <p className="font-bold">Role: <span className="font-normal text-gray-800">{job.jobTitle}</span></p>
//                 <p className="font-bold">Company: <span className="font-normal text-gray-800">{job.companyName}</span></p>
//                 <p className="font-bold">Location: <span className="font-normal text-gray-800">{job.jobLocation}</span></p>
//                 <p className="font-bold">Description: <span className="font-normal text-gray-800">{job.jobDescription}</span></p>
//                 <p className="font-bold">Experience: <span className="font-normal text-gray-800">{job.experience || '0-3 yrs'}</span></p>
//                 <p className="font-bold">Salary: <span className="font-normal text-gray-800">{job.salary}</span></p>
//                 <p className="font-bold">Total Applicants: <span className="font-normal text-gray-800">{job.applicantCount || 0}</span></p>
//                 <p className="font-bold">Posted Date: <span className="font-normal text-gray-800">{new Date(job.createdAt).toLocaleDateString()}</span></p>
//             </div>

//             {showForm && (
//                 <JobApplicationForm
//                     job={job}
//                     onSubmit={(formData) => console.log("✅ Form submitted with:", formData)}
//                     onClose={handleCloseForm}
//                 />
//             )}
//         </div>
//     );
// };

// export default JobDescription;





























// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setNewApplication } from '@/redux/jobSlice';
// import JobApplicationForm from './JobApplicationForm';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { toast } from 'react-toastify';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const JobDescription = () => {
//     const { id: jobId } = useParams();  
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!jobId) {
//             setError("Invalid Job ID");
//             setLoading(false);
//             return;
//         }

//         const fetchJobDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/api/jobs/${jobId}`);
//                 setJob(response.data);
//             } catch (err) {
//                 console.error("❌ Error fetching job details:", err);
//                 setError(err.response?.data?.message || "Failed to fetch job details");
//                 toast.error(err.response?.data?.message || "Failed to fetch job details");
//                 navigate('/jobs');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobDetails();
//     }, [jobId, navigate]);

//     const handleApplyNow = () => setShowForm(true);
//     const handleCloseForm = () => setShowForm(false);

//     if (loading) return <div className="text-center text-lg font-bold">Loading job details...</div>;
//     if (error) return <div className="text-red-500 text-center font-semibold">{error}</div>;

//     return (
//         <div className="max-w-7xl mx-auto my-10 p-5 shadow-md bg-white rounded-lg">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="font-bold text-xl">{job.jobTitle} - Job Description</h1>
//                     <h2 className="text-lg font-semibold text-gray-700">Company: {job.companyName}</h2>
//                     <div className="flex items-center gap-2 mt-4">
//                         <Badge className="text-blue-700 font-bold" variant="ghost">
//                             {job.position} Positions
//                         </Badge>
//                         <Badge className="text-[#F83002] font-bold" variant="ghost">
//                             {job.jobType}
//                         </Badge>
//                         <Badge className="text-[#7209b7] font-bold" variant="ghost">
//                             {job.salary}
//                         </Badge>
//                     </div>
//                 </div>
//                 <Button className="bg-[#7209b7]" onClick={handleApplyNow}>Apply Now</Button>
//             </div>

//             <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Details</h1>
//             <div className="my-4 space-y-2">
//                 <p className="font-bold">Role: <span className="font-normal text-gray-800">{job.jobTitle}</span></p>
//                 <p className="font-bold">Company: <span className="font-normal text-gray-800">{job.companyName}</span></p>
//                 <p className="font-bold">Location: <span className="font-normal text-gray-800">{job.jobLocation}</span></p>
//                 <p className="font-bold">Description: <span className="font-normal text-gray-800">{job.jobDescription}</span></p>
//                 <p className="font-bold">Experience: <span className="font-normal text-gray-800">{job.experience || '0-3 yrs'}</span></p>
//                 <p className="font-bold">Salary: <span className="font-normal text-gray-800">{job.salary}</span></p>
//                 <p className="font-bold">Total Applicants: <span className="font-normal text-gray-800">{job.applicantCount || 0}</span></p>
//                 <p className="font-bold">Posted Date: <span className="font-normal text-gray-800">{new Date(job.createdAt).toLocaleDateString()}</span></p>
//             </div>

//             {showForm && (
//                 <JobApplicationForm
//                     job={job}
//                     onSubmit={(formData) => console.log("✅ Form submitted with:", formData)}
//                     onClose={handleCloseForm}
//                 />
//             )}
//         </div>
//     );
// };

// export default JobDescription;





























import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNewApplication } from '@/redux/jobSlice';
import JobApplicationForm from './JobApplicationForm';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDescription = () => {
    const { id } = useParams();  
    const [job, setJob] = useState(null);
    const [companyName, setCompanyName] = useState("Loading...");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) {
            console.error("❌ No jobId found in URL.");
            setError("Invalid Job ID");
            setLoading(false);
            return;
        }

        const fetchJobDetails = async () => {
            try {
                const jobResponse = await axios.get(`http://localhost:8081/Job/jobs/${id}`);
                const jobData = jobResponse.data;
                setJob(jobData);

                if (jobData.companyId) {
                    fetchCompanyDetails(jobData.companyId);
                }
            } catch (err) {
                console.error("❌ Error fetching job details:", err);
                setError("Failed to fetch job details");
                toast.error("Failed to fetch job details");
            } finally {
                setLoading(false);
            }
        };

        const fetchCompanyDetails = async (companyId) => {
            try {
                const companyResponse = await axios.get(`http://localhost:8081/companies/${companyId}`);
                setCompanyName(companyResponse.data.companyName || "Unknown Company");
            } catch (err) {
                console.error("❌ Error fetching company details:", err);
                setCompanyName("Unknown Company");
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleApplyNow = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    if (loading) return <div className="text-center text-lg font-bold">Loading job details...</div>;
    if (error) return <div className="text-red-500 text-center font-semibold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto my-10 p-5 shadow-md bg-white rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{job.jobsTitle} - Job Description</h1>
                    <h2 className="text-lg font-semibold text-gray-700">Company: {companyName}</h2>
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
                </div>
                <Button className="bg-[#7209b7]" onClick={handleApplyNow}>Apply Now</Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Details</h1>
            <div className="my-4 space-y-2">
                <p className="font-bold">Role: <span className="font-normal text-gray-800">{job.jobsTitle}</span></p>
                <p className="font-bold">Company: <span className="font-normal text-gray-800">{companyName}</span></p>
                <p className="font-bold">Location: <span className="font-normal text-gray-800">{job.location}</span></p>
                <p className="font-bold">Description: <span className="font-normal text-gray-800">{job.description}</span></p>
                <p className="font-bold">Experience: <span className="font-normal text-gray-800">{job.experience || '0-3 yrs'}</span></p>
                <p className="font-bold">Salary: <span className="font-normal text-gray-800">{job.salary}</span></p>
                <p className="font-bold">Total Applicants: <span className="font-normal text-gray-800">{job.jobApplications?.length || 0}</span></p>
                <p className="font-bold">Posted Date: <span className="font-normal text-gray-800">{new Date(job.createdAt || job.postedDate).toLocaleDateString()}</span></p>
            </div>

            {showForm && (
                <JobApplicationForm
                    job={job}
                    onSubmit={(formData) => console.log("✅ Form submitted with:", formData)}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default JobDescription;
