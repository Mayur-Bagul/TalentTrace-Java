
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateInputs = () => {
    const errors = {};
    if (!input.fullname.trim()) errors.fullname = 'Full Name is required.';
    if (!input.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      errors.email = 'A valid email is required.';
    }
    if (!input.phoneNumber.trim() || !/^\d{10}$/.test(input.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be 10 digits.';
    }
    if (!input.password.trim() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.password)) {
      errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;  
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
  
    try {
      
      const data = {
        username: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: [input.role],
      };
  
      // Sending a POST request to Spring Boot backend API for user registration
      const response = await axios.post('http://localhost:8088/api/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',  // Send data as JSON
        },
      });
  
     
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      
      toast.error('Registration failed! ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Register</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type='text'
              value={input.fullname}
              name='fullname'
              onChange={changeEventHandler}
              placeholder='Enter your full name'
            />
            {errors.fullname && <p className='text-red-500 text-sm'>{errors.fullname}</p>}
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='Enter your email address'
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type='text'
              value={input.phoneNumber}
              name='phoneNumber'
              onChange={changeEventHandler}
              placeholder='Enter your phone number'
            />
            {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber}</p>}
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='Enter your password'
            />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>
          <div className='my-2'>
            <Label>Confirm Password</Label>
            <Input
              type='password'
              value={input.confirmPassword}
              name='confirmPassword'
              onChange={changeEventHandler}
              placeholder='Confirm your password'
            />
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Role:</label>
              <select
                name='role'
                value={input.role}
                onChange={changeEventHandler}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors'
              >
                <option value=''>Select Role</option>
                <option value='consumer'>User</option>
                <option value='recruiter'>Recruiter</option>
                <option value='admin'>Admin</option>
              </select>
            </div>
          </div>
          <Button type='submit' className='w-full my-4'>
            Register
          </Button>
          <span className='text-sm'>
            Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup; 