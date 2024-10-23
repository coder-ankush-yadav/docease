import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const NavbarBeforeLogin = () => {
    return (
        <nav className="bg-customGreen p-5 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Section */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
                        <span className="text-white text-2xl font-bold">DocEase</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-10">
                    <li>
                        <Link to="/" className="text-white text-lg hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-white text-lg hover:text-gray-300">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white text-lg hover:text-gray-300">Contact Us</Link>
                    </li>
                </ul>

                {/* Login/Signup buttons */}
                <div className="flex space-x-4">
                    <Link to="/login" className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-customGreen">
                        Login
                    </Link>
                    <Link to="/signup" className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-customGreen">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarBeforeLogin;
