import React, { useEffect, useState } from 'react';
import OwnerNavigation from './OwnerNavigation'; // Custom owner navigation
import Footer from './Footer'; // Reusing the same footer
import { Link, useNavigate } from 'react-router-dom'; // Adding useNavigate for navigation
import axiosInstance from './api/axios'; // Assuming axiosInstance is configured to handle your API requests

const OwnerDashboardLayout = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [properties, setProperties] = useState([]); // State for fetched properties
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Fetch logged-in user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
        if (storedUser) {
            setLoggedInUser(storedUser); // Set logged-in user in state
        }
    }, []);

    // Fetch properties for the logged-in owner using email
    useEffect(() => {
        const fetchProperties = async () => {
            const ownerEmail = loggedInUser ? loggedInUser.email : null; // Get owner email from the logged-in user
            console.log('Owner email from localStorage:', ownerEmail); // Log the owner email

            if (ownerEmail) {
                try {
                    const response = await axiosInstance.get(`properties/owner/email/${ownerEmail}`);
                    console.log('Fetched properties:', response.data); // Log the fetched properties
                    setProperties(response.data); // Set the properties in state
                } catch (error) {
                    setErrorMessage('Error fetching properties');
                    console.error('Error fetching properties:', error);
                }
            } else {
                setErrorMessage('No owner email found');
                console.log('No owner email found in localStorage');
            }
        };

        if (loggedInUser) {
            fetchProperties(); // Call the function to fetch properties on mount
        }
    }, [loggedInUser]);

    return (
        <div>
            <OwnerNavigation /> {/* Custom navigation for the owner */}
            <div className="container mx-auto py-10">
                {/* Personalized Greeting */}
                <h1 className="text-4xl mb-6">
                    Welcome, {loggedInUser ? loggedInUser.firstName : 'Owner'} to your Dashboard!
                </h1>

                {/* Introduction about DocEase */}
                <div className="mb-10">
                    <p className="text-lg text-gray-700 mb-4">
                        DocEase is your one-stop platform to manage your properties and tenants effortlessly.
                        As an owner, you can easily add new properties and track rent payments.
                        We simplify the renting process for you, allowing you to focus on growing your business while we handle the documentation.
                    </p>
                </div>

                {/* Two Columns Layout: Add Property and View Listed Properties */}
                <div className="grid grid-cols-2 gap-10">
                    {/* Add Property Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>
                        <p className="text-lg mb-4">
                            Quickly add new properties to the platform. Manage details like rent, water bill, electricity bill, and generate a unique tenant code.
                        </p>
                        <Link to="/add-property">
                            <button className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600">
                                Add Property
                            </button>
                        </Link>
                    </div>
                </div>

                {/* View Listed Properties Section */}
                <div className="bg-white shadow-lg p-6 rounded-lg mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Your Listed Properties</h2>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {properties.length > 0 ? (
                        <ul>
                            {properties.map(property => (
                                <li key={property._id} className="mb-4">
                                    <h3 className="text-lg font-semibold">{property.address}</h3>
                                    <p>Rent: {property.rent}</p>
                                    <p>Deposit: {property.deposit}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No properties listed.</p>
                    )}
                </div>
            </div>

            <Footer /> {/* Reusing the same footer */}
        </div>
    );
};

export default OwnerDashboardLayout;
