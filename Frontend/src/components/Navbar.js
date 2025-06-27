import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const showLogout = loggedIn && location.pathname === '/feed';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-200 p-4 flex justify-between">
      <h1 className="font-bold text-lg">IITKGP Social</h1>
      {showLogout && (
        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
