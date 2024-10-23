import React from 'react';

const ContactPage = () => {
    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {/* Contact Us Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">Contact Us</h1>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        If you have any questions, feedback, or need support, feel free to contact us at the email address below. We are here to help you.
                    </p>
                </div>

                {/* Email Section */}
                <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                    <h2 className="text-3xl text-customGreen font-bold mb-6 text-center">Reach Us At:</h2>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        You can reach out to our support team at:{" "}
                        <a href="mailto:docease2024@gmail.com" className="text-customGreen font-bold hover:underline">
                            docease2024@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
