import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to IITKGP Social</h1>
      <div className="flex gap-4">
        <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-green-600 text-white rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
