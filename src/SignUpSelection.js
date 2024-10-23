import React from 'react';

const SignUpSelection = ({ setUserType }) => {
    return (
        <div className="bg-gray-100 py-10 min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome to DocEase!</h1>
                <p className="text-lg mb-8">Are you signing up as a Tenant or an Owner?</p>

                <div className="space-y-4">
                    <button
                        className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                        onClick={() => setUserType('tenant')}
                    >
                        Sign Up as Tenant
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                        onClick={() => setUserType('owner')}
                    >
                        Sign Up as Owner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpSelection;
