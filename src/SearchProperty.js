import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios'; // Use axiosInstance for API requests

const SearchProperty = () => {
    const [properties, setProperties] = useState([]);
    const [emailStatus, setEmailStatus] = useState('');
    const [loading, setLoading] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch the listed properties from the backend when the component mounts
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axiosInstance.get('/properties/for-search'); // API endpoint to fetch properties
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setErrorMessage('Error fetching properties. Please try again later.');
            }
        };
        fetchProperties();
    }, []);

    // Handle showing interest and sending email
    const handleShowInterest = async (propertyId, ownerEmail) => {
        setLoading(propertyId); // Set loading state for the specific property
        const storedUser = JSON.parse(localStorage.getItem('user')); // Fetch tenant info
    
        try {
            const response = await axiosInstance.post('/properties/show-interest', {
                propertyId, // Send propertyId
                tenantEmail: storedUser.email, // Send tenant's email
                tenantName: `${storedUser.firstName} ${storedUser.lastName}` // Send tenant's name
            });
    
            if (response.data.success) {
                setEmailStatus(`Email sent to the owner (${ownerEmail}) expressing your interest!`);
            } else {
                setEmailStatus('Unable to send email. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending interest email:', error);
            setEmailStatus('Error sending email. Please try again later.');
        } finally {
            setLoading(''); // Reset loading state
        }
    };
    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl mb-6">Search Properties</h1>

            {/* Show error message if there is any */}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            {/* Display property list */}
            {properties.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white shadow-lg p-6 rounded-lg">
                            <h2 className="text-2xl mb-4 font-bold">{property.address}</h2>
                            <p><strong>Rent:</strong> ₹{property.rent}</p>
                            <p><strong>Deposit:</strong> ₹{property.deposit}</p>
                            <p><strong>Water Bill:</strong> ₹{property.waterBill}</p>
                            <p><strong>Electricity Bill:</strong> ₹{property.electricityBill}</p>

                            <button
                                className="bg-customGreen text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-4"
                                onClick={() => handleShowInterest(property._id, property.ownerEmail)}
                                disabled={loading === property._id} // Disable only the button for the property being processed
                            >
                                {loading === property._id ? 'Sending Email...' : 'Show Interest'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No properties listed currently.</p>
            )}

            {/* Show email status after sending interest */}
            {emailStatus && <p className="text-green-500 mt-6">{emailStatus}</p>}
        </div>
    );
};

export default SearchProperty;
