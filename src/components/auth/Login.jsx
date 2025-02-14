import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const errors = {};
    if (!input.email.trim()) errors.email = 'Email is required.';
    if (!input.password.trim()) errors.password = 'Password is required.';
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
      const response = await axios.post('http://localhost:8088/api/auth/signin', {
        email: input.email,
        password: input.password,
      });
  
      const { accessToken, roles } = response.data;
  
      if (!accessToken) {
        throw new Error('Token is missing from the response.');
      }
  
      // Save token and roles in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('roles', JSON.stringify(roles));
  
      toast.success('Login successful!');
  
      // Role-based navigation
      const role = roles.length > 0 ? roles[0] : ''; 
      console.log('Fetched Role:', role);
  
      switch (role) {
        case 'ROLE_ADMIN':
          navigate('/admin/users');
          break;
        case 'ROLE_USER':
          navigate('/user/Jobs');
          break;
        case 'ROLE_RECRUITER':
          navigate('/jobs');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error(
        'Login failed! ' + (error.response?.data?.message || error.message)
      );
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
            Login
          </h1>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <Input
                type="text"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder=" "
                className="peer mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
              />
              <Label className="absolute left-4 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                Email
              </Label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder=" "
                className="peer mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
              />
              <Label className="absolute left-4 top-2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                Password
              </Label>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>


            {/* Submit Button */}
            <Button
              type="submit"
              className="flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <LogIn className="mr-2" size={18} /> Login
            </Button>

            <div className="text-center">
              <span className="text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </span>
            </div>
            <div className='mt-2'>
              <Link 
                to='/forgot-password' 
                className='text-sm text-red-500 hover:underline hover:text-red-600 transition ease-in-out duration-200'
              >
                Forgotten Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


