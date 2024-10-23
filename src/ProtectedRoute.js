import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check for the token

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If token exists, allow access to the route
    return children;
};

export default ProtectedRoute;
