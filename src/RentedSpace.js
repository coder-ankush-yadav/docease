import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axios'; // Replace with your axios instance or API call logic

const RentedSpace = () => {
    const [rentedProperties, setRentedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rented properties from the backend
    useEffect(() => {
        const fetchRentedProperties = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in tenant
                const response = await axiosInstance.get(`/tenant/rented-properties/${user.id}`); // Replace with your endpoint
                setRentedProperties(response.data);
            } catch (err) {
                setError('Failed to fetch rented properties.');
            } finally {
                setLoading(false);
            }
        };

        fetchRentedProperties();
    }, []);

    // Display loading, error, or rented properties
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl mb-6">Your Rented Spaces</h1>
            {loading ? (
                <p>Loading your rented properties...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : rentedProperties.length === 0 ? (
                <p>You are currently not renting any flat.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rentedProperties.map((property) => (
                        <div key={property.id} className="bg-white shadow-lg p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">{property.name}</h2>
                            <p><strong>Address:</strong> {property.address}</p>
                            <p><strong>Rent:</strong> ₹{property.rent}</p>
                            <p><strong>Deposit:</strong> ₹{property.deposit}</p>
                            <p><strong>Water Bill:</strong> ₹{property.waterBill}</p>
                            <p><strong>Electricity Bill:</strong> ₹{property.electricityBill}</p>
                            <p><strong>Payment Date:</strong> {property.paymentDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RentedSpace;
