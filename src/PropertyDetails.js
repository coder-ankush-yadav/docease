// PropertyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './api/axios'; 

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axiosInstance.get(`/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                setErrorMessage('Error fetching property details');
            }
        };
        fetchPropertyDetails();
    }, [id]);

    return (
        <div className="container mx-auto py-10">
            {errorMessage ? (
                <div className="text-red-500">{errorMessage}</div>
            ) : property ? (
                <div className="bg-white p-6 shadow rounded-lg">
                    <h1 className="text-3xl font-bold">{property.address}</h1>
                    <p>Rent: ${property.rent}</p>
                    <p>Deposit: ${property.deposit}</p>
                    <p>Payment Due Date: {property.paymentDueDate}</p>

                    {/* Display images */}
                    <div className="mt-4">
                        <img src={`/${property.gateImage}`} alt="Gate" className="w-full" />
                        <img src={`/${property.interiorImage}`} alt="Interior" className="w-full mt-4" />
                        <img src={`/${property.kitchenImage}`} alt="Kitchen" className="w-full mt-4" />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default PropertyDetails;
