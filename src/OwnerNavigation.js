import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

const OwnerNavigation = () => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Fetch logged-in user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoggedInUser(null);
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="bg-customGreen p-5 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Section - Redirect to Owner Dashboard */} 
                <div className="flex items-center">
                    <Link to="/owner-dashboard" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
                        <span className="text-white text-2xl font-bold">DocEase</span>
                    </Link>
                </div>

                {/* Owner-specific Navigation Links */} 
                <ul className="flex space-x-10">
                    <li><Link to="/owner-dashboard" className="text-white text-lg">Dashboard</Link></li>
                    <li><Link to="/add-property" className="text-white text-lg">Add Property</Link></li>
                </ul>

                {/* User Greeting and Logout */}
                <div className="flex items-center space-x-4">
                    {loggedInUser ? (
                        <>
                            <span className="text-white">Hello, {loggedInUser.firstName}</span>
                            <button
                                onClick={handleLogout}
                                className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-customGreen"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-white border border-white rounded px-4 py-2">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default OwnerNavigation;
