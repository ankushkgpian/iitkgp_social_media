import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const API = process.env.REACT_APP_BACKEND_URL;
const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${API}/api/auth/verify/${token}`);
        setStatus(res.data.message || 'Email verified!');
      } catch (err) {
        setStatus(err.response?.data?.error || 'Verification failed');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <p className="text-lg">{status}</p>
    </div>
  );
};

export default Verify;
