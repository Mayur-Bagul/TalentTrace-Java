// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  
// import { motion } from 'framer-motion';
// import { Edit, Search, Trash2, X, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

// const JobTable = () => {
//     const [jobs, setJobs] = useState([]);  
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [isEditModalOpen, setEditModalOpen] = useState(false);
//     const [isAddModalOpen, setAddModalOpen] = useState(false);
//     const [editJob, setEditJob] = useState(null);
//     const [newJob, setNewJob] = useState({ title: "", category: "", location: "", salary: "", applicants: "" });
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8081/Job/all');
//                 setJobs(response.data);
//                 setFilteredJobs(response.data); // Initially set filteredJobs to all jobs
//             } catch (err) {
//                 setError('Error fetching job data. Please try again.');
//                 console.error(err);
//             }
//         };

//         fetchJobs();
//     }, []);

//     const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

//     const SearchHandler = (e) => {
//         const term = e.target.value.toLowerCase();
//         setSearchTerm(term);
//         const filtered = jobs.filter(job =>
//             job.title.toLowerCase().includes(term) ||
//             job.category.toLowerCase().includes(term) ||
//             job.location.toLowerCase().includes(term)
//         );
//         setFilteredJobs(filtered);
//         setCurrentPage(1);
//     };

//     const handleEdit = (job) => {
//         setEditJob(job);
//         setEditModalOpen(true);
//     };

//     const handleDelete = (jobId) => {
//         axios.delete(`http://localhost:8080/api/jobs/${jobId}`)
//             .then(() => {
//                 setJobs(jobs.filter(job => job.id !== jobId));
//                 setFilteredJobs(filteredJobs.filter(job => job.id !== jobId));
//             })
//             .catch(error => console.error("Error deleting job:", error));
//     };

//     const handleAdd = () => {
//         const jobToAdd = { ...newJob, salary: parseFloat(newJob.salary), applicants: parseInt(newJob.applicants) };
//         axios.post('http://localhost:8080/api/jobs', jobToAdd)
//             .then(response => {
//                 setJobs([response.data, ...jobs]);
//                 setFilteredJobs([response.data, ...filteredJobs]);
//                 setAddModalOpen(false);
//                 setNewJob({ title: "", category: "", location: "", salary: "", applicants: "" });
//             })
//             .catch(error => console.error("Error adding job:", error));
//     };

//     const handleSave = () => {
//         const updatedJob = { ...editJob, salary: parseFloat(editJob.salary), applicants: parseInt(editJob.applicants) };
//         axios.put(`http://localhost:8080/api/jobs/${editJob.id}`, updatedJob)
//             .then(response => {
//                 setJobs(jobs.map(job => (job.id === editJob.id ? response.data : job)));
//                 setFilteredJobs(filteredJobs.map(job => (job.id === editJob.id ? response.data : job)));
//                 setEditModalOpen(false);
//             })
//             .catch(error => console.error("Error updating job:", error));
//     };

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const getCurrentPageJobs = () => {
//         const start = (currentPage - 1) * itemsPerPage;
//         return filteredJobs.slice(start, start + itemsPerPage);
//     };

//     return (
//         <motion.div
//             className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700 mb-6 relative z-10'
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2, delay: 0.2 }}
//         >
//             {/* Header and Search */}
//             <div className='flex justify-between items-center mb-6'>
//                 <h2 className='text-xl font-semibold text-gray-100'>Job Listings</h2>
//                 <div className='relative flex items-center'>
//                     <Search className='absolute left-3 text-gray-400 sm:left-2.5 top-2.5' size={20} />
//                     <input
//                         type="text"
//                         placeholder='Search Jobs...'
//                         className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500'
//                         onChange={SearchHandler}
//                         value={searchTerm}
//                     />
//                 </div>
//             </div>

//             <div className='overflow-x-auto'>
//                 <table className='min-w-full divide-y divide-gray-400'>
//                     <thead>
//                         <tr>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Job Title</th>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Category</th>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Location</th>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Salary</th>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Applicants</th>
//                             <th className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className='divide-y divide-gray-500'>
//                         {getCurrentPageJobs().map((job) => (
//                             <motion.tr
//                                 key={job.id}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1.1, delay: 0.2 }}
//                             >
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{job.title}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.category}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.location}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>$ {job.salary.toFixed(2)}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.applicants}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
//                                     <div className='flex items-center gap-4'>
//                                         <button onClick={() => setAddModalOpen(true)} className='text-green-500 hover:text-green-700'>
//                                             <UserPlus size={20} />
//                                         </button>
//                                         <button onClick={() => handleEdit(job)} className='text-blue-500 hover:text-blue-700'>
//                                             <Edit size={18} />
//                                         </button>
//                                         <button onClick={() => handleDelete(job.id)} className='text-red-500 hover:text-red-700'>
//                                             <Trash2 size={18} />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </motion.tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className='flex justify-between items-center mt-4'>
//                 <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'
//                 >
//                     <ChevronLeft size={20} />
//                 </button>
//                 <span className='text-gray-400'>Page {currentPage} of {totalPages}</span>
//                 <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'
//                 >
//                     <ChevronRight size={20} />
//                 </button>
//             </div>

//             {/* Edit Modal */}
//             {isEditModalOpen && (
//                 <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20'>
//                     <div className='bg-white p-6 rounded-lg w-96'>
//                         <div className='flex justify-between items-center'>
//                             <h3 className='text-lg font-semibold'>Edit Job</h3>
//                             <button onClick={() => setEditModalOpen(false)}><X size={20} /></button>
//                         </div>
//                         <div className='mt-4'>
//                             <label className='block text-sm font-medium text-gray-700'>Job Title</label>
//                             <input
//                                 type='text'
//                                 className='mt-1 block w-full p-2 border rounded-md'
//                                 value={editJob?.title || ''}
//                                 onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
//                             />
//                         </div>
//                         <div className='mt-4'>
//                             <label className='block text-sm font-medium text-gray-700'>Category</label>
//                             <input
//                                 type='text'
//                                 className='mt-1 block w-full p-2 border rounded-md'
//                                 value={editJob?.category || ''}
//                                 onChange={(e) => setEditJob({ ...editJob, category: e.target.value })}
//                             />
//                         </div>
//                         <div className='mt-4'>
//                             <label className='block text-sm font-medium text-gray-700'>Location</label>
//                             <input
//                                 type='text'
//                                 className='mt-1 block w-full p-2 border rounded-md'
//                                 value={editJob?.location || ''}
//                                 onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
//                             />
//                         </div>
//                         <div className='mt-4'>
//                             <label className='block text-sm font-medium text-gray-700'>Salary</label>
//                             <input
//                                 type='number'
//                                 className='mt-1 block w-full p-2 border rounded-md'
//                                 value={editJob?.salary || ''}
//                                 onChange={(e) => setEditJob({ ...editJob, salary: e.target.value })}
//                             />
//                         </div>
//                         <div className='mt-4'>
//                             <label className='block text-sm font-medium text-gray-700'>Applicants</label>
//                             <input
//                                 type='number'
//                                 className='mt-1 block w-full p-2 border rounded-md'
//                                 value={editJob?.applicants || ''}
//                                 onChange={(e) => setEditJob({ ...editJob, applicants: e.target.value })}
//                             />
//                         </div>
//                         <div className='mt-4 flex justify-end'>
//                             <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
//                                 Save Changes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default JobTable; 











































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  
// import { motion } from 'framer-motion';
// import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// const JobTable = () => {
//     const [jobs, setJobs] = useState([]);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8081/Job/all');
//                 setJobs(response.data);
//                 setFilteredJobs(response.data);
//             } catch (err) {
//                 setError('Error fetching jobs. Please try again.');
//                 console.error(err);
//             }
//         };
//         fetchJobs();
//     }, []);

//     const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

//     const searchHandler = (e) => {
//         const term = e.target.value.toLowerCase();
//         setSearchTerm(term);
//         const filtered = jobs.filter(job =>
//             job.jobTitle.toLowerCase().includes(term) ||
//             (job.companyId?.companyName?.toLowerCase() || "").includes(term) ||
//             job.jobLocation.toLowerCase().includes(term) ||
//             job.jobDescription.toLowerCase().includes(term)
//         );
//         setFilteredJobs(filtered);
//         setCurrentPage(1);
//     };

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const getCurrentPageJobs = () => {
//         const start = (currentPage - 1) * itemsPerPage;
//         return filteredJobs.slice(start, start + itemsPerPage);
//     };

//     return (
//         <motion.div
//             className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700 mb-6 relative z-10'
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2, delay: 0.2 }}
//         >
//             <div className='flex justify-between items-center mb-6'>
//                 <h2 className='text-xl font-semibold text-gray-100'>Job Listings</h2>
//                 <div className='relative flex items-center'>
//                     <Search className='absolute left-3 text-gray-400' size={20} />
//                     <input
//                         type="text"
//                         placeholder='Search Jobs...'
//                         className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-auto'
//                         onChange={searchHandler}
//                         value={searchTerm}
//                     />
//                 </div>
//             </div>

//             <div className='overflow-x-auto'>
//                 <table className='min-w-full divide-y divide-gray-400'>
//                     <thead>
//                         <tr>
//                             <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Job Title</th>
//                             <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Location</th>
//                             <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Description</th>
//                         </tr>
//                     </thead>
//                     <tbody className='divide-y divide-gray-500'>
//                         {getCurrentPageJobs().map((job) => (
//                             <motion.tr key={job.jobId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.2 }}>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.jobTitle}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.jobLocation}</td>
//                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{job.jobDescription}</td>
//                             </motion.tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className='flex justify-between items-center mt-4'>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'>
//                     <ChevronLeft size={20} />
//                 </button>
//                 <span className='text-gray-400'>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'>
//                     <ChevronRight size={20} />
//                 </button>
//             </div>
//         </motion.div>
//     );
// };

// export default JobTable;











import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Edit2, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobTable = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8081/Job/all');
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (err) {
                setError('Error fetching jobs. Please try again.');
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    const searchHandler = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = jobs.filter(job =>
            job.jobsTitle.toLowerCase().includes(term) ||
            (job.companyName?.toLowerCase() || "").includes(term) ||
            job.location.toLowerCase().includes(term) ||
            job.description.toLowerCase().includes(term)
        );
        setFilteredJobs(filtered);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const getCurrentPageJobs = () => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredJobs.slice(start, start + itemsPerPage);
    };

    return (
        <motion.div className='bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700 mb-6 relative z-10'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Job Listings</h2>
                <div className='relative flex items-center'>
                    <Search className='absolute left-3 text-gray-400' size={20} />
                    <input
                        type='text'
                        placeholder='Search Jobs...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-auto'
                        onChange={searchHandler}
                        value={searchTerm}
                    />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-400'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Company</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Title</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Description</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Location</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Salary</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Experience</th>
                            <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Skills</th>
                            {/* <th className='px-6 py-3 text-center text-sm font-medium text-gray-300'>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-500'>
                        {getCurrentPageJobs().map((job) => (
                            <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.2 }}>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.companyName || 'N/A'}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.jobsTitle}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.description}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.location}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.salary}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.experience}</td>
                                <td className='px-6 py-4 text-sm text-gray-100'>{job.requirements}</td>
                                <td className='px-6 py-4 text-center'>
                                    {/* <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={() => navigate(`/updatejob/${job.id}`)} className='flex items-center gap-2 text-blue-500 cursor-pointer'>
                                                <Edit2 className='w-4' /> <span>Edit</span>
                                            </div>
                                            <div onClick={() => console.log('View applicants')} className='flex items-center gap-2 text-green-500 cursor-pointer mt-2'>
                                                <Eye className='w-4' /> <span>Applicants</span>
                                            </div>
                                            <div onClick={() => console.log('Delete job')} className='flex items-center gap-2 text-red-500 cursor-pointer mt-2'>
                                                <Trash2 className='w-4' /> <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover> */}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-between items-center mt-4'>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'>
                    <ChevronLeft size={20} />
                </button>
                <span className='text-gray-400'>Page {currentPage} of {totalPages}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50'>
                    <ChevronRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default JobTable;
