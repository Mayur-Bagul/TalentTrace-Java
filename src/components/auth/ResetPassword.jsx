import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;  
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
  
    const token = localStorage.getItem('jwtToken');
  
    try {
      const response = await axios.post(
        'http://localhost:8088/api/auth/reset-password',
        { phoneNumber: phone, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  
          },
        }
      );
      toast.success(response.data.message || 'Password reset successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
        onSubmit={handleResetPassword}
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;


