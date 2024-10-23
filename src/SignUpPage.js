import React, { useState } from 'react';
import axiosInstance from './api/axios'; // Use the axios instance
import { useNavigate } from 'react-router-dom'; // For redirection

const SignUpPage = () => {
    const [step, setStep] = useState(1); // To track which step the user is on
    const [userType, setUserType] = useState(''); // To track whether user selects Tenant or Owner
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        otp: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Track loading state
    const [message, setMessage] = useState(''); // Success or Error messages
    const navigate = useNavigate(); // For redirection

    // Simple validation function for initial user input
    const validateInputs = () => {
        let valid = true;
        let newErrors = {};

        if (formData.firstName === '') {
            newErrors.firstName = 'First Name is required';
            valid = false;
        }

        if (formData.lastName === '') {
            newErrors.lastName = 'Last Name is required';
            valid = false;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Email is not valid';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle User Type Selection (Tenant/Owner)
    const handleUserTypeSelection = (type) => {
        setUserType(type);
        setStep(2); // Move to step 2 (details input)
    };

    // Function to handle Next Step (Send OTP)
    const handleNextStep = async () => {
        if (validateInputs()) {
            setLoading(true);
            try {
                await axiosInstance.post('auth/send-otp', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    email: formData.email,
                    userType: userType,
                });
                setMessage('OTP sent successfully!');
                setStep(3); // Move to OTP step
            } catch (error) {
                if (error.response?.data?.msg === 'User is already registered.') {
                    setMessage('User is already registered.');
                    setStep(5); // New step for showing "User already registered" message
                } else {
                    setMessage(error.response?.data?.msg || 'Error sending OTP, please try again.');
                }
            }
            setLoading(false);
        }
    };

    // Function to handle OTP Verification
    const handleVerify = async () => {
        setLoading(true);
        try {
            await axiosInstance.post('auth/verify-otp', {
                email: formData.email,
                otp: formData.otp,
            });
            setMessage('OTP verified! You can now create a password.');
            setStep(4); // Move to password creation step
        } catch (error) {
            setMessage('Entered OTP is incorrect, please try again.'); // Updated error message
        }
        setLoading(false);
    };

    // Password Validation
    const validatePassword = () => {
        let valid = true;
        let newErrors = {};

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Function to handle password setting
    const handleSetPassword = async () => {
        if (validatePassword()) {
            setLoading(true);
            try {
                await axiosInstance.post('auth/set-password', {
                    email: formData.email,
                    password: formData.password,
                    userType: userType,
                });
                setMessage('Password set successfully! You are now registered.');
                setStep(6); // Final step
            } catch (error) {
                setMessage('Error setting password, please try again.');
            }
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle Back button click (returns user to previous step)
    const handleBack = () => {
        if (step === 3) setStep(2); // Go back from OTP to User Details
        else if (step === 4) setStep(3); // Go back from Password Creation to OTP Verification
        else if (step === 2) setStep(1); // Go back to User Type Selection
    };

    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {step === 1 ? (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10 text-center">
                        <h1 className="text-4xl text-customGreen font-bold mb-6">Welcome to DocEase!</h1>
                        <p className="text-lg text-gray-600 mb-6">Are you signing up as a Tenant or an Owner?</p>
                        <div className="flex justify-center space-x-10">
                            <button
                                onClick={() => handleUserTypeSelection('tenant')}
                                className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                            >
                                Sign Up as Tenant
                            </button>
                            <button
                                onClick={() => handleUserTypeSelection('owner')}
                                className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                            >
                                Sign Up as Owner
                            </button>
                        </div>
                    </div>
                ) : step === 2 ? (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                        <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">
                            You are signing up as {userType === 'tenant' ? 'Tenant' : 'Owner'}
                        </h1>
                        <form>
                            {message && <p className="text-red-500 text-center">{message}</p>}
                            <div className="mb-6">
                                <label className="block text-lg text-gray-600 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-lg text-gray-600 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-lg text-gray-600 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-lg text-gray-600 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Next'}
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-600 mt-4"
                        >
                            Back
                        </button>
                    </div>
                ) : step === 3 ? (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                        <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">OTP Verification</h1>
                        {message && <p className="text-red-500 text-center">{message}</p>}
                        <p className="text-lg text-gray-600 mb-6 text-center">
                            An OTP has been sent to your email ID: <strong>{formData.email}</strong>
                        </p>

                        <div className="mb-6">
                            <label className="block text-lg text-gray-600 mb-2">Enter OTP</label>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-3"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleVerify}
                            className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-600 mt-4"
                        >
                            Back
                        </button>
                    </div>
                ) : step === 4 ? (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                        <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">Create Password</h1>
                        {message && <p className="text-green-500 text-center">{message}</p>}

                        <div className="mb-6">
                            <label className="block text-lg text-gray-600 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-3"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg text-gray-600 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-3"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleSetPassword}
                            className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Setting Password...' : 'Set Password'}
                        </button>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-600 mt-4"
                        >
                            Back
                        </button>
                    </div>
                ) : step === 5 ? (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10 text-center">
                        <h1 className="text-4xl text-red-500 font-bold mb-6">User Already Exists</h1>
                        <p className="text-lg text-gray-600 mb-6">This email is already registered. Please login instead.</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10 text-center">
                        <h1 className="text-4xl text-customGreen font-bold mb-6">Registration Successful!</h1>
                        <p className="text-lg text-gray-600 mb-6">You have successfully registered. You can now log in.</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
