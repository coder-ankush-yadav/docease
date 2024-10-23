import React from 'react';

const LandingPage = () => {
    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {/* Welcome Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">Welcome to DocEase</h1>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Your trusted document management solution. DocEase simplifies the rental process for both tenants and owners by
                        providing a user-friendly interface for managing documents and agreements securely and efficiently.
                    </p>
                </div>

                {/* Key Features Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h2 className="text-3xl text-customGreen font-bold mb-6 text-center">Key Features</h2>
                    <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                        <li className="mb-3">✔ Simplified Document Management for tenants and owners</li>
                        <li className="mb-3">✔ OTP-based Secure Login for added safety</li>
                        <li className="mb-3">✔ Automated Rental Agreement Creation and Reminders</li>
                        <li className="mb-3">✔ Real-time Notifications for document submissions and rent payments</li>
                    </ul>
                </div>

                {/* Benefits for Tenants Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h2 className="text-3xl text-customGreen font-bold mb-6 text-center">Benefits for Tenants</h2>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Easily manage your rental documents and agreements. Receive timely reminders for rent payments and other important updates.
                        DocEase simplifies the rental process for tenants with a paperless workflow.
                    </p>
                </div>

                {/* Benefits for Owners Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h2 className="text-3xl text-customGreen font-bold mb-6 text-center">Benefits for Owners</h2>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Organize your property listings, review tenant documents securely, and automate rental agreements. 
                        With DocEase, owners save time and effort in managing tenant interactions and agreements.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
