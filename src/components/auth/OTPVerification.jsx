import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone; 
  const token = localStorage.getItem("token");  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:8088/api/auth/verify-otp',
        { phoneNumber: phone, otp },  
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      );
      toast.success(response.data.message || 'OTP verified!');
      navigate('/reset-password', { state: { phone } });
    } catch (error) {
      console.error("Verification Error:", error);
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to verify OTP');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
        onSubmit={handleVerifyOtp}
      >
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <label className="block mb-2">OTP</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpVerification;



