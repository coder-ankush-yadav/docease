import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios'; // Assuming axiosInstance is configured to handle your API requests

const OwnerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch properties when the component mounts
    useEffect(() => {
        const fetchProperties = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve the user from localStorage
            const ownerEmail = storedUser?.email; // Get the owner's email

            if (ownerEmail) {
                try {
                    const response = await axiosInstance.get(`properties/owner/email/${ownerEmail}`);
                    setProperties(response.data); // Store the fetched properties
                } catch (error) {
                    setErrorMessage('Error fetching properties');
                    console.error('Error fetching properties:', error);
                }
            } else {
                setErrorMessage('No owner email found');
            }
        };
        fetchProperties(); // Call fetch function
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">Your Listed Properties</h1>

            {errorMessage ? (
                <div className="text-red-500">{errorMessage}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white p-6 shadow rounded-lg">
                            <h2 className="text-xl font-bold">{property.address}</h2>
                            <p>Rent: ₹{property.rent}</p>
                            <p>Deposit: ₹{property.deposit}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerProperties;
