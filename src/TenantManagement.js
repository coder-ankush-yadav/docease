import React, { useState } from 'react';
import axiosInstance from './api/axios'; // Assuming you are using axiosInstance for API requests

const TenantManagement = () => {
    const [uniqueCode, setUniqueCode] = useState('');
    const [tenantData, setTenantData] = useState(null); // Store tenant data
    const [errorMessage, setErrorMessage] = useState(''); // To display errors
    const [loading, setLoading] = useState(false); // Loading state for API request

    // Handle input change for unique code
    const handleInputChange = (e) => {
        setUniqueCode(e.target.value);
    };

    // Fetch tenant data based on unique code
    const handleVerifyCode = async () => {
        if (!uniqueCode) {
            setErrorMessage('Please enter the unique code.');
            return;
        }

        setLoading(true); // Set loading to true while fetching data

        try {
            const response = await axiosInstance.post('/verify-tenant-code', { uniqueCode }); // Backend API call
            if (response.status === 200) {
                setTenantData(response.data.tenant); // Store tenant data if found
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid code or tenant not found.');
            }
        } catch (error) {
            setErrorMessage('Error verifying code. Please try again.');
            console.error('Error fetching tenant data:', error);
        }

        setLoading(false); // Set loading to false after request completes
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">Tenant Management</h1>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <h2 className="text-2xl mb-4">Verify Tenant by Unique Code</h2>
                <input
                    type="text"
                    placeholder="Enter Unique Code"
                    value={uniqueCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <button
                    onClick={handleVerifyCode}
                    className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify Code'}
                </button>

                {/* Display error message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}
            </div>

            {/* Tenant Data Section */}
            {tenantData && (
                <div className="bg-white p-8 mt-6 rounded-lg shadow-md max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Tenant Information</h2>
                    <p className="mb-2">
                        <strong>First Name: </strong> {tenantData.firstName}
                    </p>
                    <p className="mb-2">
                        <strong>Last Name: </strong> {tenantData.lastName}
                    </p>
                    <p className="mb-2">
                        <strong>Email: </strong> {tenantData.email}
                    </p>
                    <p className="mb-2">
                        <strong>Aadhar Card: </strong>{' '}
                        {tenantData.documents.aadharCard || 'Not Provided'}
                    </p>
                    <p className="mb-2">
                        <strong>PAN Card: </strong>{' '}
                        {tenantData.documents.panCard || 'Not Provided'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TenantManagement;
