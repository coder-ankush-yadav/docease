import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axios'; // Use axiosInstance for API requests

const GenerateUniqueCode = () => {
    const [properties, setProperties] = useState([]); // To store the list of properties
    const [selectedProperty, setSelectedProperty] = useState(''); // Store selected property
    const [tenantEmail, setTenantEmail] = useState(''); // Store tenant email
    const [uniqueCode, setUniqueCode] = useState(''); // Store generated unique code
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch properties from the database on component mount
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axiosInstance.get('/owner-properties'); // Fetch owner's properties from DB
                if (response.status === 200) {
                    setProperties(response.data); // Assuming the data contains an array of properties
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    // Handle property selection
    const handlePropertySelect = (e) => {
        setSelectedProperty(e.target.value);
    };

    // Handle tenant email input
    const handleEmailInput = (e) => {
        setTenantEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/send-unique-code', {
                propertyId: selectedProperty, // Attach property ID
                tenantEmail: tenantEmail // Tenant email
            });

            if (response.status === 200) {
                setUniqueCode(response.data.uniqueCode); // Get the unique code sent from backend
                setSuccessMessage('Unique code sent to tenant email successfully!');
                // Clear form
                setSelectedProperty('');
                setTenantEmail('');
            }
        } catch (error) {
            console.error('Error sending unique code:', error);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">Generate Unique Code for Tenant</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg mb-2">Select Property</label>
                    <select
                        value={selectedProperty}
                        onChange={handlePropertySelect}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="" disabled>Select a property</option>
                        {properties.map((property) => (
                            <option key={property._id} value={property._id}>
                                {property.address} - Rent: ₹{property.rent}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg mb-2">Tenant's Email</label>
                    <input
                        type="email"
                        value={tenantEmail}
                        onChange={handleEmailInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                >
                    Send Unique Code
                </button>
            </form>

            {successMessage && (
                <div className="mt-6 text-green-500 text-xl text-center">
                    {successMessage} <br />
                    Unique Code: <strong>{uniqueCode}</strong>
                </div>
            )}
        </div>
    );
};

export default GenerateUniqueCode;
