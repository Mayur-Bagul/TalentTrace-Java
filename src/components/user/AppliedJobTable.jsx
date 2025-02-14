// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { updateApplication, setNewApplication, deleteJob, setAllAppliedJobs } from '@/redux/jobSlice'; // Add setAllAppliedJobs action
// // import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// // import JobApplicationForm from './JobApplicationForm';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';

// // const AppliedJobTable = () => {
// //     const dispatch = useDispatch();
// //     const applications = useSelector(state => state.job.allAppliedJobs); 
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [applicationToUpdate, setApplicationToUpdate] = useState(null); 

// //     useEffect(() => {
// //         // API call to fetch applied jobs using Axios
// //         axios.get('http://localhost:8081/api/applications/all')  // Replace with your backend API URL
// //             .then((response) => {
// //                 // Dispatch the action to set the fetched data in Redux store
// //                 dispatch(setAllAppliedJobs(response.data)); 
// //             })
// //             .catch(() => {
// //                 toast.error("Failed to fetch applications.");
// //             });
// //     }, [dispatch]);

// //     const handleUpdate = (application) => {
// //         setApplicationToUpdate(application);
// //         setIsModalOpen(true); 
// //     };

// //     const handleDelete = (applicationId) => {
// //         try {
// //             // Dispatch action to delete the job application
// //             dispatch(deleteJob(applicationId));
// //             toast.success("Application deleted successfully!");
// //         } catch {
// //             toast.error("Failed to delete application.");
// //         }
// //     };

// //     const handleClose = () => {
// //         setIsModalOpen(false);
// //         setApplicationToUpdate(null);
// //     };

// //     const handleSubmit = (formData, applicationId) => {
// //         if (applicationId) {
// //             // Update existing application
// //             dispatch(updateApplication({ ...formData, id: applicationId }));
// //             toast.success('Application updated successfully!');
// //         } else {
// //             // Add new application
// //             dispatch(setNewApplication(formData));
// //             toast.success('Application submitted successfully!');
// //         }
// //         setIsModalOpen(false);
// //     };

// //     return (
// //         <div>
// //             <Table>
// //                 <TableCaption>Your Applied Jobs</TableCaption>
// //                 <TableHeader>
// //                     <TableRow>
// //                         <TableHead>Name</TableHead>
// //                         <TableHead>Email</TableHead>
// //                         <TableHead>Job Title</TableHead>
// //                         <TableHead>Cover Letter</TableHead>
// //                         <TableHead>Status</TableHead>
// //                         <TableHead>Actions</TableHead>
// //                     </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                     {applications.length === 0 ? (
// //                         <TableRow>
// //                             <TableCell colSpan={5}>You haven't applied for any jobs yet.</TableCell>
// //                         </TableRow>
// //                     ) : (
// //                         applications.map((appliedJob) => (
// //                             <TableRow key={appliedJob.id}>
// //                                 <TableCell>{appliedJob.name}</TableCell>
// //                                 <TableCell>{appliedJob.email}</TableCell>
// //                                 <TableCell>{appliedJob.jobTitle}</TableCell>
// //                                 <TableCell>{appliedJob.coverLetter ? 'Uploaded' : 'Not Provided'}</TableCell>
// //                                 <TableCell>
// //                                            {appliedJob.status || "Pending"} 
// //                                 </TableCell>
// //                                 <TableCell>
// //                                     <button className="update-btn" onClick={() => handleUpdate(appliedJob)}>Update</button>
// //                                     <button className="delete-btn" onClick={() => handleDelete(appliedJob.id)}>Delete</button>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))
// //                     )}
// //                 </TableBody>
// //             </Table>

// //             {isModalOpen && (
// //                 <JobApplicationForm
// //                     job={{ title: applicationToUpdate?.jobTitle }}
// //                     onSubmit={handleSubmit}
// //                     onClose={handleClose}
// //                     applicationData={applicationToUpdate}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default AppliedJobTable;











































// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setAllAppliedJobs } from '@/redux/jobSlice';
// // import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// // import JobApplicationForm from './JobApplicationForm';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';

// // const AppliedJobTable = () => {
// //     const dispatch = useDispatch();
// //     const applications = useSelector(state => state.job.allAppliedJobs);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [applicationToUpdate, setApplicationToUpdate] = useState(null);

// //     useEffect(() => {
// //         axios.get('http://localhost:8081/api/applications/all')
// //             .then((response) => {
// //                 dispatch(setAllAppliedJobs(response.data));
// //             })
// //             .catch(() => {
// //                 toast.error("Failed to fetch applications.");
// //             });
// //     }, [dispatch]);

// //     const handleUpdate = (application) => {
// //         setApplicationToUpdate(application);
// //         setIsModalOpen(true);
// //     };

// //     const handleDelete = async (applicationId) => {
// //         try {
// //             await axios.delete(`http://localhost:8081/api/applications/delete/${applicationId}`);
// //             dispatch(setAllAppliedJobs(applications.filter(app => app.id !== applicationId)));
// //             toast.success("Application deleted successfully!");
// //         } catch {
// //             toast.error("Failed to delete application.");
// //         }
// //     };

// //     const handleClose = () => {
// //         setIsModalOpen(false);
// //         setApplicationToUpdate(null);
// //     };

// //     const handleSubmit = async (formData, applicationId) => {
// //         try {
// //             const response = await axios.put(`http://localhost:8081/api/applications/update/${applicationId}`, formData);
// //             dispatch(setAllAppliedJobs(applications.map(app => app.id === applicationId ? response.data : app)));
// //             toast.success('Application updated successfully!');
// //             setIsModalOpen(false);
// //         } catch {
// //             toast.error('Failed to update application.');
// //         }
// //     };

// //     return (
// //         <div>
// //             <Table>
// //                 <TableCaption>Your Applied Jobs</TableCaption>
// //                 <TableHeader>
// //                     <TableRow>
// //                         <TableHead>Name</TableHead>
// //                         <TableHead>Email</TableHead>
// //                         <TableHead>Job Title</TableHead>
// //                         <TableHead>Cover Letter</TableHead>
// //                         <TableHead>Status</TableHead>
// //                         <TableHead>Actions</TableHead>
// //                     </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                     {applications.length === 0 ? (
// //                         <TableRow>
// //                             <TableCell colSpan={6} className="text-center">You haven't applied for any jobs yet.</TableCell>
// //                         </TableRow>
// //                     ) : (
// //                         applications.map((appliedJob) => (
// //                             <TableRow key={appliedJob.id}>
// //                                 <TableCell>{appliedJob.name}</TableCell>
// //                                 <TableCell>{appliedJob.email}</TableCell>
// //                                 <TableCell>{appliedJob.jobTitle}</TableCell>
// //                                 <TableCell>{appliedJob.coverLetter ? 'Uploaded' : 'Not Provided'}</TableCell>
// //                                 <TableCell>{appliedJob.status || "Pending"}</TableCell>
// //                                 <TableCell>
// //                                     <button className="update-btn" onClick={() => handleUpdate(appliedJob)}>Update</button>
// //                                     <button className="delete-btn" onClick={() => handleDelete(appliedJob.id)}>Delete</button>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))
// //                     )}
// //                 </TableBody>
// //             </Table>

// //             {isModalOpen && (
// //                 <JobApplicationForm
// //                     job={{ title: applicationToUpdate?.jobTitle }}
// //                     onSubmit={handleSubmit}
// //                     onClose={handleClose}
// //                     applicationData={applicationToUpdate}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default AppliedJobTable;





















// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateApplication, setNewApplication, deleteJob, setAllAppliedJobs } from '@/redux/jobSlice';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import JobApplicationForm from './JobApplicationForm';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// import  Navbar  from '../shared/Navbar';

// const AppliedJobTable = () => {
//     const dispatch = useDispatch();
//     const applications = useSelector(state => state.job.allAppliedJobs);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [applicationToUpdate, setApplicationToUpdate] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8081/api/applications/all')
//             .then(response => dispatch(setAllAppliedJobs(response.data)))
//             .catch(() => toast.error("Failed to fetch applications."));
//     }, [dispatch]);

//     const handleUpdate = (application) => {
//         setApplicationToUpdate(application);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (Id) => {
//         if (!window.confirm("Are you sure you want to delete this application?")) return;
//         try {
//             await axios.delete(`http://localhost:8081/api/applications/delete/${Id}`);
//             dispatch(deleteJob(Id));
//             toast.success("Application deleted successfully!");
//         } catch {
//             toast.error("Failed to delete application.");
//         }
//     };

//     const handleClose = () => {
//         setIsModalOpen(false);
//         setApplicationToUpdate(null);
//     };

//     const handleSubmit = async (formData, Id) => {
//         try {
//             if (Id) {
//                 const updatedData = { ...formData, Id, JobId: applicationToUpdate?.jobId };
//                 await axios.put(`http://localhost:8081/api/applications/update/${Id}`, updatedData);
//                 dispatch(updateApplication(updatedData));
//                 toast.success('Application updated successfully!');
//             } else {
//                 const response = await axios.post('http://localhost:8081/api/applications/add', formData);
//                 dispatch(setNewApplication(response.data));
//                 toast.success('Application submitted successfully!');
//             }
//             setIsModalOpen(false);
//         } catch {
//             toast.error('Failed to process the application.');
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
//                 <h2 className="text-lg font-semibold text-center mb-4">Your Applied Jobs</h2>
//                 <Table>
//                     <TableCaption>A list of all your job applications</TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Email</TableHead>
//                             <TableHead>Job Title</TableHead>
//                             <TableHead>Description</TableHead>
//                             <TableHead>Location</TableHead>
//                             <TableHead>Type</TableHead>
//                             <TableHead>Salary</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {applications.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={9} className="text-center py-4 text-gray-500">
//                                     You haven't applied for any jobs yet.
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             applications.map((appliedJob, index) => (
//                                 <TableRow key={appliedJob.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                                     <TableCell>{appliedJob.name}</TableCell>
//                                     <TableCell>{appliedJob.email}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.jobTitle || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobTitle?.jobDescription || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobTitle?.jobLocation || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobTitle?.jobType || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobTitle?.salary || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.status}</TableCell>
//                                     <TableCell>
//                                         <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleUpdate(appliedJob)}>
//                                             Update
//                                         </button>
//                                         <button className="px-3 py-1 bg-red-500 text-white rounded-lg ml-2" onClick={() => handleDelete(appliedJob.id)}>
//                                             Delete
//                                         </button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//                 {isModalOpen && (
//                     <JobApplicationForm
//                         job={applicationToUpdate?.jobTitle}
//                         jobId={applicationToUpdate?.jobId}
//                         onSubmit={handleSubmit}
//                         onClose={handleClose}
//                         applicationData={applicationToUpdate}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AppliedJobTable;
























// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateApplication, setNewApplication, deleteJob, setAllAppliedJobs } from '@/redux/jobSlice';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import JobApplicationForm from './JobApplicationForm';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import Navbar from '../shared/Navbar';

// const AppliedJobTable = () => {
//     const dispatch = useDispatch();
//     const applications = useSelector(state => state.job.allAppliedJobs);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [applicationToUpdate, setApplicationToUpdate] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8081/api/applications/all')
//             .then(response => {
//                 console.log("Fetched applications:", response.data); // Debugging log
//                 dispatch(setAllAppliedJobs(response.data));
//             })
//             .catch(() => toast.error("Failed to fetch applications."));
//     }, [dispatch]);

//     const handleUpdate = (application) => {
//         setApplicationToUpdate(application);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this application?")) return;
//         try {
//             await axios.delete(`http://localhost:8081/api/applications/delete/${id}`);
//             dispatch(deleteJob(id));
//             toast.success("Application deleted successfully!");
//         } catch {
//             toast.error("Failed to delete application.");
//         }
//     };

//     const handleClose = () => {
//         setIsModalOpen(false);
//         setApplicationToUpdate(null);
//     };

//     const handleSubmit = async (formData, id) => {
//         try {
//             if (id) {
//                 const updatedData = { ...formData, id, jobId: applicationToUpdate?.jobId };
//                 await axios.put(`http://localhost:8081/api/applications/update/${id}`, updatedData);
//                 dispatch(updateApplication(updatedData));
//                 toast.success('Application updated successfully!');
//             } else {
//                 const response = await axios.post('http://localhost:8081/api/applications/add', formData);
//                 dispatch(setNewApplication(response.data));
//                 toast.success('Application submitted successfully!');
//             }
//             setIsModalOpen(false);
//         } catch {
//             toast.error('Failed to process the application.');
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
//                 <h2 className="text-lg font-semibold text-center mb-4">Your Applied Jobs</h2>
//                 <Table>
//                     <TableCaption>A list of all your job applications</TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Email</TableHead>
//                             <TableHead>Job Title</TableHead>
//                             <TableHead>Description</TableHead>
//                             <TableHead>Location</TableHead>
//                             <TableHead>Type</TableHead>
//                             <TableHead>Salary</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {applications.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={9} className="text-center py-4 text-gray-500">
//                                     You haven't applied for any jobs yet.
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             applications.map((appliedJob, index) => (
//                                 <TableRow key={appliedJob.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                                     <TableCell>{appliedJob.name}</TableCell>
//                                     <TableCell>{appliedJob.email}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.jobsTitle || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.description || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.location || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.jobType || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.jobId?.salary || 'N/A'}</TableCell>
//                                     <TableCell>{appliedJob.status || 'Pending'}</TableCell>
//                                     <TableCell>
//                                         <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleUpdate(appliedJob)}>
//                                             Update
//                                         </button>
//                                         <button className="px-3 py-1 bg-red-500 text-white rounded-lg ml-2" onClick={() => handleDelete(appliedJob.id)}>
//                                             Delete
//                                         </button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//                 {isModalOpen && (
//                     <JobApplicationForm
//                         job={applicationToUpdate?.jobId} // Pass correct job details
//                         jobId={applicationToUpdate?.jobId?.id}
//                         onSubmit={handleSubmit}
//                         onClose={handleClose}
//                         applicationData={applicationToUpdate}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AppliedJobTable;







































import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateApplication, setNewApplication, deleteJob, setAllAppliedJobs } from '@/redux/jobSlice';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import JobApplicationForm from './JobApplicationForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import UNavbar from '../shared/UserNav';


const AppliedJobTable = () => {
    const dispatch = useDispatch();
    const applications = useSelector(state => state.job.allAppliedJobs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationToUpdate, setApplicationToUpdate] = useState(null);
    const [jobDetails, setJobDetails] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/api/applications/all')
            .then(response => {
                dispatch(setAllAppliedJobs(response.data));
            })
            .catch(() => toast.error("Failed to fetch applications."));
    }, [dispatch]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            const jobData = {};
            await Promise.all(applications.map(async (application) => {
                if (application.jobId) {
                    try {
                        const response = await axios.get(`http://localhost:8081/Job/jobs/${application.jobId}`);
                        jobData[application.jobId] = response.data;
                    } catch {
                        jobData[application.jobId] = null;
                    }
                }
            }));
            setJobDetails(jobData);
        };

        if (applications.length > 0) {
            fetchJobDetails();
        }
    }, [applications]);

    const handleUpdate = (application) => {
        setApplicationToUpdate(application);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            await axios.delete(`http://localhost:8081/api/applications/delete/${id}`);
            dispatch(deleteJob(id));
            toast.success("Application deleted successfully!");
        } catch {
            toast.error("Failed to delete application.");
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setApplicationToUpdate(null);
    };

    const handleSubmit = async (formData, id) => {
        try {
            if (id) {
                const updatedData = { ...formData, id, jobId: applicationToUpdate?.jobId };
                await axios.put(`http://localhost:8081/api/applications/update/${id}`, updatedData);
                dispatch(updateApplication(updatedData));
                toast.success('Application updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8081/api/applications/add', formData);
                dispatch(setNewApplication(response.data));
                toast.success('Application submitted successfully!');
            }
            setIsModalOpen(false);
        } catch {
            toast.error('Failed to process the application.');
        }
    };

    return (
        <div>
            <UNavbar />
            <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-center mb-4">Your Applied Jobs</h2>
                <Table>
                    <TableCaption>A list of all your job applications</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                                    You haven't applied for any jobs yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            applications.map((appliedJob, index) => {
                                const job = jobDetails[appliedJob.jobId] || {};
                                return (
                                    <TableRow key={appliedJob.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <TableCell>{appliedJob.name}</TableCell>
                                        <TableCell>{appliedJob.email}</TableCell>
                                        <TableCell>{job.jobsTitle || 'N/A'}</TableCell>
                                        <TableCell>{job.description || 'N/A'}</TableCell>
                                        <TableCell>{job.location || 'N/A'}</TableCell>
                                        <TableCell>{job.jobType || 'N/A'}</TableCell>
                                        <TableCell>{job.salary || 'N/A'}</TableCell>
                                        <TableCell>{appliedJob.status || 'Pending'}</TableCell>
                                        <TableCell>
                                            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleUpdate(appliedJob)}>
                                                Update
                                            </button>
                                            <button className="px-3 py-1 bg-red-500 text-white rounded-lg ml-2" onClick={() => handleDelete(appliedJob.id)}>
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
                {isModalOpen && (
                    <JobApplicationForm
                        job={jobDetails[applicationToUpdate?.jobId] || {}}
                        jobId={applicationToUpdate?.jobId}
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                        applicationData={applicationToUpdate}
                    />
                )}
            </div>
        </div>
    );
};

export default AppliedJobTable;
