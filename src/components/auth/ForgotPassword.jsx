import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState('');  
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:8088/api/auth/send-otp', { phoneNumber });
      toast.success(response.data.message || 'OTP sent!');
      navigate('/verify-otp', { state: { phone: phoneNumber } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
        onSubmit={handleForgotPassword}
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;


