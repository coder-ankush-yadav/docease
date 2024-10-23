import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {/* About DocEase Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">About DocEase</h1>
                    <p className="text-lg text-gray-600 leading-relaxed text-center mb-6">
                        DocEase is a comprehensive platform designed to simplify document management for both tenants and property owners. 
                        Our platform offers a user-friendly interface that helps manage important documents like rental agreements, identification proofs, 
                        and payment reminders, all in one place.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Whether you're a tenant trying to find a new home or a property owner managing your properties, DocEase provides a secure, 
                        organized system for handling important documents with ease and transparency.
                    </p>
                </div>

                {/* Our Mission Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h2 className="text-3xl text-customGreen font-bold mb-6 text-center">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        At DocEase, our mission is to create a seamless and transparent rental process, 
                        helping both tenants and owners manage their documents and agreements without hassle.
                        We prioritize security, efficiency, and user satisfaction to ensure a smoother rental experience for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
