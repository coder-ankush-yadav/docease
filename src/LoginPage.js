import React, { useState } from 'react';
import axiosInstance from './api/axios'; // Using axiosInstance for API requests
import { useNavigate } from 'react-router-dom'; // For redirection

const LoginPage = () => {
    const [step, setStep] = useState(1); // Step 1: Select Tenant/Owner; Step 2: Show Login form
    const [userType, setUserType] = useState(''); // Track user type (Tenant or Owner)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Track loading state
    const [showPassword, setShowPassword] = useState(false); // Added missing state for "Show Password" toggle
    const [loginSuccessMessage, setLoginSuccessMessage] = useState(''); // For showing success message
    const [loginSuccessful, setLoginSuccessful] = useState(false); // Track if login was successful
    const navigate = useNavigate(); // For redirection

    // Simple validation function for email and password
    const validateInputs = () => {
        let valid = true;
        let newErrors = {};

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Email is not valid';
            valid = false;
        }

        // Validate password
        if (formData.password === '') {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle login request
    const handleLogin = async () => {
        if (validateInputs()) {
            setLoading(true);
            try {
                // Send login request to backend using axiosInstance
                const response = await axiosInstance.post('auth/login', {
                    email: formData.email,
                    password: formData.password,
                    userType: userType, // Send the selected userType (tenant/owner)
                });

                // If login is successful, retrieve token and user data
                const { token, user } = response.data;

                // Store token and user data in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Storing the owner's ID in localStorage (if the user is an owner)
                if (user.userType === 'owner') {
                    localStorage.setItem('ownerId', user._id); // Save the owner's ID to localStorage
                }

                // Show success message
                setLoginSuccessMessage('Login Successful!');
                setLoginSuccessful(true); // Set login success state to true
                setLoading(false);

                // After 2 seconds, navigate to the appropriate dashboard based on userType
                setTimeout(() => {
                    if (user.userType === 'tenant') {
                        console.log("Navigating to tenant dashboard");
                        navigate('/tenant-dashboard'); // Redirect tenant to tenant dashboard
                    } else if (user.userType === 'owner') {
                        console.log("Navigating to owner dashboard");
                        navigate('/owner-dashboard'); // Redirect owner to owner dashboard
                    }
                }, 2000); // Show success message for 2 seconds before redirecting
            } catch (error) {
                setLoading(false);
                console.error('Login error:', error.response?.data?.msg || 'Login failed');
                setErrors({ email: error.response?.data?.msg || 'Invalid email or password' }); // Show error message
            }
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle user type selection
    const handleUserTypeSelection = (type) => {
        setUserType(type);
        setStep(2); // Move to the login form after selection
    };

    // Handle Back button to go back to user type selection
    const handleBack = () => {
        setStep(1); // Go back to tenant/owner selection
    };

    return (
        <div className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                {step === 1 ? (
                    // Step 1: Select Tenant or Owner
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10 text-center">
                        <h1 className="text-4xl text-customGreen font-bold mb-6">Welcome to DocEase!</h1>
                        <p className="text-lg text-gray-600 mb-6">Are you logging in as a Tenant or an Owner?</p>
                        <div className="flex justify-center space-x-10">
                            <button
                                onClick={() => handleUserTypeSelection('tenant')}
                                className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                            >
                                Login as Tenant
                            </button>
                            <button
                                onClick={() => handleUserTypeSelection('owner')}
                                className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                            >
                                Login as Owner
                            </button>
                        </div>
                    </div>
                ) : loginSuccessful ? (
                    // Show Login Success Message if loginSuccessful is true
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10 text-center">
                        <h1 className="text-6xl text-customGreen font-bold mb-6">Login Successful!</h1>
                    </div>
                ) : (
                    // Step 2: Login form
                    <div className="bg-white p-10 shadow-xl rounded-lg mb-10">
                        <h1 className="text-4xl text-customGreen font-bold mb-6 text-center">
                            Login as {userType === 'tenant' ? 'Tenant' : 'Owner'}
                        </h1>

                        <form>
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

                            <div className="mb-6">
                                <label className="block text-lg text-gray-600 mb-2">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                <div className="mt-2">
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    <label htmlFor="showPassword" className="ml-2 text-sm text-gray-600">Show Password</label>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogin}
                                className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-600 mt-4"
                            >
                                Back
                            </button>

                            <div className="mt-4 text-center">
                                <a href="/forgot-password" className="text-sm text-customGreen hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
