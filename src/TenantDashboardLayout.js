import React, { useState, useEffect } from 'react';
import TenantNavigation from './TenantNavigation'; // Custom navbar after login for tenant
import Footer from './Footer'; // Reusing the same footer
import { Link } from 'react-router-dom';

const TenantDashboardLayout = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Fetch logged-in user from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    return (
        <div>
            <TenantNavigation /> {/* Tenant-specific navbar after login */}
            <div className="container mx-auto py-10">
                {/* Personalized Greeting */}
                <h1 className="text-4xl mb-6">
                    Welcome, {loggedInUser ? loggedInUser.firstName : 'Tenant'} to your Dashboard!
                </h1>

                {/* Introduction about DocEase */}
                <div className="mb-10">
                    <p className="text-lg text-gray-700 mb-4">
                        DocEase is designed to make your renting experience smooth and hassle-free. 
                        You can easily search for properties available for rent, manage your rented properties, and stay on top of rent-related tasks.
                    </p>
                </div>

                {/* Single Column Layout: Search Property */}
                <div className="grid grid-cols-1 gap-10">
                    {/* Search Property Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Search Property</h2>
                        <p className="text-lg mb-4">
                            Browse available rental properties. Use our platform to find your next home quickly and easily.
                        </p>
                        <Link to="/search-property">
                            <button className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600">
                                Search Property
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer /> {/* Reusing the same footer */}
        </div>
    );
};

export default TenantDashboardLayout;
