/*import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const CompanySetup = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    
    const [loading, setLoading] = useState(false);

    // Fetch company details from the backend using Axios
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/companies/${params.id}`);
                const company = response.data;

                if (company) {
                    setInput({
                        name: company.name || "",
                        description: company.description || "",
                        website: company.website || "",
                        location: company.location || "",
                        file: company.logo || null // Assuming logo is stored in 'file'
                    });
                } else {
                    toast.error('Company not found!');
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
                toast.error('Failed to fetch company data');
            }
        };

        fetchCompany();
    }, [params.id]);

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('description', input.description);
            formData.append('website', input.website);
            formData.append('location', input.location);
            if (input.file) {
                formData.append('logo', input.file); // Assuming you're uploading a file
            }

            // Update company details via PUT or PATCH request to the backend
            const response = await axios.put(`http://localhost:8080/companies/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // If you're uploading a file
                },
            });

            if (response.status === 200) {
                toast.success('Company updated successfully!');
                navigate("/companies"); // Redirect to companies list page
            }
        } catch (error) {
            console.error("Error updating company:", error);
            toast.error('Failed to update company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Submit</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
*/














/*import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const CompanySetup = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const [loading, setLoading] = useState(false);
    const isEditMode = !!params.id; // Determine if we are editing or adding

    // Fetch company details if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchCompany = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/companies/${params.id}`);
                    const company = response.data;

                    if (company) {
                        setInput({
                            name: company.name || "",
                            description: company.description || "",
                            website: company.website || "",
                            location: company.location || "",
                            file: company.logo || null // Assuming logo is stored in 'file'
                        });
                    } else {
                        toast.error('Company not found!');
                    }
                } catch (error) {
                    console.error("Error fetching company data:", error);
                    toast.error('Failed to fetch company data');
                }
            };

            fetchCompany();
        }
    }, [params.id, isEditMode]);

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('description', input.description);
            formData.append('website', input.website);
            formData.append('location', input.location);
            if (input.file) {
                formData.append('logo', input.file);
            }

            if (isEditMode) {
                // Update company via PUT request
                const response = await axios.put(`http://localhost:8080/companies/update/${params.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    toast.success('Company updated successfully!');
                    navigate("/companies");
                }
            } else {
                // Add company via POST request
                const response = await axios.post('http://localhost:8080/companies/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 201) {
                    toast.success('Company added successfully!');
                    navigate("/companies");
                }
            }
        } catch (error) {
            console.error(isEditMode ? "Error updating company:" : "Error adding company:", error);
            toast.error(isEditMode ? 'Failed to update company' : 'Failed to add company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>{isEditMode ? "Update Company" : "Add Company"}</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">{isEditMode ? "Update" : "Add"}</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
*/
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const CompanySetup = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: ""
    });

    const [loading, setLoading] = useState(false);
    const isEditMode = !!params.id; // Determine if we are editing or adding

    // Fetch company details if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchCompany = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/companies/${params.id}`);
                    const company = response.data;

                    if (company) {
                        setInput({
                            companyName: company.companyName || "",
                            description: company.description || "",
                            website: company.website || "",
                            location: company.location || ""
                        });
                    } else {
                        toast.error('Company not found!');
                    }
                } catch (error) {
                    console.error("Error fetching company data:", error);
                    toast.error('Failed to fetch company data');
                }
            };

            fetchCompany();
        }
    }, [params.id, isEditMode]);

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = {
                companyName: input.companyName,
                description: input.description,
                website: input.website,
                location: input.location
            };

            if (isEditMode) {
                // Update company via PUT request
                const response = await axios.put(`http://localhost:8081/companies/update/${params.id}`, formData);

                if (response.status === 200) {
                    toast.success('Company updated successfully!');
                    navigate("/companies");
                }
            } else {
                // Add company via POST request
                const response = await axios.post('http://localhost:8081/companies/add', formData);

                if (response.status === 201) {
                    toast.success('Company added successfully!');
                    navigate("/companies");
                }
            }
        } catch (error) {
            console.error(isEditMode ? "Error updating company:" : "Error adding company:", error);
            toast.error(isEditMode ? 'Failed to update company' : 'Failed to add company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>{isEditMode ? "Update Company" : "Add Company"}</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                value={input.companyName}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">{isEditMode ? "Update" : "Add"}</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
