import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateApplication, setNewApplication, deleteJob, setAllAppliedJobs } from '@/redux/jobSlice'; // Add setAllAppliedJobs action
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import JobApplicationForm from './JobApplicationForm';
import { toast } from 'react-toastify';
import axios from 'axios';

const AppliedJobTable = () => {
    const dispatch = useDispatch();
    const applications = useSelector(state => state.job.allAppliedJobs); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationToUpdate, setApplicationToUpdate] = useState(null); 

    useEffect(() => {
        // API call to fetch applied jobs using Axios
        axios.get('http://localhost:8081/api/applications')  // Replace with your backend API URL
            .then((response) => {
                // Dispatch the action to set the fetched data in Redux store
                dispatch(setAllAppliedJobs(response.data)); 
            })
            .catch(() => {
                toast.error("Failed to fetch applications.");
            });
    }, [dispatch]);

    const handleUpdate = (application) => {
        setApplicationToUpdate(application);
        setIsModalOpen(true); 
    };

    const handleDelete = (applicationId) => {
        try {
            // Dispatch action to delete the job application
            dispatch(deleteJob(applicationId));
            toast.success("Application deleted successfully!");
        } catch {
            toast.error("Failed to delete application.");
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setApplicationToUpdate(null);
    };

    const handleSubmit = (formData, applicationId) => {
        if (applicationId) {
            // Update existing application
            dispatch(updateApplication({ ...formData, id: applicationId }));
            toast.success('Application updated successfully!');
        } else {
            // Add new application
            dispatch(setNewApplication(formData));
            toast.success('Application submitted successfully!');
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <Table>
                <TableCaption>Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Cover Letter</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5}>You haven't applied for any jobs yet.</TableCell>
                        </TableRow>
                    ) : (
                        applications.map((appliedJob) => (
                            <TableRow key={appliedJob.id}>
                                <TableCell>{appliedJob.name}</TableCell>
                                <TableCell>{appliedJob.email}</TableCell>
                                <TableCell>{appliedJob.jobTitle}</TableCell>
                                <TableCell>{appliedJob.coverLetter ? 'Uploaded' : 'Not Provided'}</TableCell>
                                <TableCell>
                                    <button className="update-btn" onClick={() => handleUpdate(appliedJob)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(appliedJob.id)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {isModalOpen && (
                <JobApplicationForm
                    job={{ title: applicationToUpdate?.jobTitle }}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                    applicationData={applicationToUpdate}
                />
            )}
        </div>
    );
};

export default AppliedJobTable;
