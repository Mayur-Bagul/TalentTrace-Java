import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const UpdateJob = () => {
    const { jobId } = useParams(); // Get jobId from route
    const [input, setInput] = useState({
        jobsTitle: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    // Fetch job details based on the jobId
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/Job/jobs/${jobId}`); // Replace with your correct endpoint
                console.log("Fetched job details:", response.data);
                setInput({
                    jobsTitle: response.data.jobsTitle,
                    description: response.data.description,
                    requirements: response.data.requirements,
                    salary: response.data.salary,
                    location: response.data.location,
                    jobType: response.data.jobType,
                    experience: response.data.experience,
                    position: response.data.position,
                    companyId: response.data.companyId,
                });
            } catch (error) {
                console.error("Error fetching job details:", error);
                toast.error("Failed to fetch job details");
            }
        };

        fetchJobDetails();
    }, [jobId]);

    // Fetch all companies to populate the company dropdown
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:8081/companies/all');
                console.log("Fetched companies:", response.data);
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
                toast.error("Failed to fetch companies");
            }
        };

        fetchCompanies();
    }, []);

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle company selection
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?.id });
    };

    // Submit the updated job details
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:8081/Job/jobs/${jobId}`, input); // PUT request to update the job
            if (response.status === 200) {
                toast.success("Job updated successfully!");
                navigate("/jobs");
            }
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="jobsTitle"
                                value={input.jobsTitle}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem value={company.companyName.toLowerCase()} key={company.id}>
                                                    {company.companyName}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Update Job
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;
