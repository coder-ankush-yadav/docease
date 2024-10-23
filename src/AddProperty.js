import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation
import axiosInstance from './api/axios'; // Assuming you are using axiosInstance for API requests

const AddProperty = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        address: '',
        deposit: '',
        rent: '',
        paymentDueDate: ''
    });
    const [images, setImages] = useState({
        gateImage: null,
        interiorImage: null,
        kitchenImage: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [userEmail, setUserEmail] = useState(''); // For storing the user email
    const [userType, setUserType] = useState(''); // For storing the user type

    // Fetch logged-in user information from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserEmail(storedUser.email); // Set userEmail from localStorage
            setUserType(storedUser.userType); // Set userType from localStorage
        }
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image input change
    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setImages({ ...images, [name]: files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send images and other details
        const propertyData = new FormData();
        propertyData.append('address', formData.address);
        propertyData.append('deposit', formData.deposit);
        propertyData.append('rent', formData.rent);
        propertyData.append('paymentDueDate', formData.paymentDueDate);
        propertyData.append('gateImage', images.gateImage); // Add gate image
        propertyData.append('interiorImage', images.interiorImage); // Add interior image
        propertyData.append('kitchenImage', images.kitchenImage); // Add kitchen image
        propertyData.append('userEmail', userEmail); // Add user email to form data
        propertyData.append('userType', userType); // Add user type to form data

        // Submit property details to the backend
        try {
            const response = await axiosInstance.post('properties/add-property', propertyData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setSuccessMessage('Your property is listed successfully.');
                // Clear form and images
                setFormData({
                    address: '',
                    deposit: '',
                    rent: '',
                    paymentDueDate: ''
                });
                setImages({
                    gateImage: null,
                    interiorImage: null,
                    kitchenImage: null
                });
            }
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    // Navigate to view the property
    const handleViewProperty = () => {
        navigate(`/properties/view`); // Assuming you have a property listing page
    };

    // Reset form to add a new property
    const handleAddNewProperty = () => {
        setFormData({
            address: '',
            deposit: '',
            rent: '',
            paymentDueDate: ''
        });
        setImages({
            gateImage: null,
            interiorImage: null,
            kitchenImage: null
        });
        setSuccessMessage(''); // Clear the success message
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-10 max-w-md mx-auto">
                {!successMessage && (
                    <>
                        <h1 className="text-3xl font-bold text-center text-customGreen mb-6">Add a New Property</h1>
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                            {/* Image Upload Section */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Gate Image</label>
                                <input
                                    type="file"
                                    name="gateImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Interior Image</label>
                                <input
                                    type="file"
                                    name="interiorImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Kitchen Image</label>
                                <input
                                    type="file"
                                    name="kitchenImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            {/* Property Details Section */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Deposit Amount</label>
                                <input
                                    type="number"
                                    name="deposit"
                                    value={formData.deposit}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Rent Amount</label>
                                <input
                                    type="number"
                                    name="rent"
                                    value={formData.rent}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-2">Payment Due Date (Monthly)</label>
                                <input
                                    type="date"
                                    name="paymentDueDate"
                                    value={formData.paymentDueDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-customGreen text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Add Property
                            </button>
                        </form>
                    </>
                )}

                {successMessage && (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6">Property Listed</h1>
                        <p className="text-green-500 text-lg mb-4">{successMessage}</p>
                        <div className="flex justify-center space-x-4">
                            {/* <Link to="/properties/view" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                View Added Property
                            </Link> */}
                            <button
                                onClick={handleAddNewProperty}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Add New Property
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProperty;
