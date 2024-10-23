import React, { useState } from 'react';
import axios from 'axios'; // Assuming you are using Axios for API requests

const EnterUniqueCode = () => {
    const [aadharCard, setAadharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [uniqueCode, setUniqueCode] = useState('');
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle file changes with validation for image files only
    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFile(file);
            setErrorMessage(''); // Clear any previous error
        } else {
            setErrorMessage('Only image files are allowed.');
        }
    };

    // Handle form submission for file upload and unique code entry
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!aadharCard || !panCard) {
            setErrorMessage('Please upload both Aadhar Card and PAN Card.');
            return;
        }

        if (!uniqueCode) {
            setErrorMessage('Please enter the unique code.');
            return;
        }

        setErrorMessage('');
        
        // Assuming API endpoint for file upload and code verification is 'api/verify-code'
        const formData = new FormData();
        formData.append('aadharCard', aadharCard);
        formData.append('panCard', panCard);
        formData.append('uniqueCode', uniqueCode);

        try {
            const response = await axios.post('/api/verify-code', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const { propertyDetails, success } = response.data;

            if (success) {
                setPropertyDetails(propertyDetails); // Assuming the backend sends property details
                setUploadSuccess(true);
            } else {
                setVerificationError('Invalid unique code or documents. Please try again.');
            }
        } catch (error) {
            setVerificationError('Error in submission. Please try again later.');
        }
    };

    const handleAcceptTerms = async () => {
        try {
            // Submit acceptance and notify backend
            await axios.post('/api/accept-terms', { uniqueCode });
            setSubmissionSuccess('Property agreement has been emailed to you!');
        } catch (error) {
            setVerificationError('Error in accepting terms. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl mb-6">Enter Unique Code</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg">
                <div className="mb-6">
                    <label className="block text-lg mb-2">Upload Aadhar Card (image file)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setAadharCard)}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg mb-2">Upload PAN Card (image file)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setPanCard)}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg mb-2">Enter Unique Code</label>
                    <input
                        type="text"
                        value={uniqueCode}
                        onChange={(e) => setUniqueCode(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {verificationError && <p className="text-red-500 mb-4">{verificationError}</p>}

                <button
                    type="submit"
                    className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </form>

            {uploadSuccess && propertyDetails && (
                <div className="bg-white shadow-lg p-6 mt-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Property Details</h2>
                    <p><strong>Address:</strong> {propertyDetails.address}</p>
                    <p><strong>Rent:</strong> {propertyDetails.rent}</p>
                    <p><strong>Deposit:</strong> {propertyDetails.deposit}</p>
                    <p><strong>Water Bill:</strong> {propertyDetails.waterBill}</p>
                    <p><strong>Electricity Bill:</strong> {propertyDetails.electricityBill}</p>

                    <div className="mt-6">
                        <button
                            onClick={handleAcceptTerms}
                            className="bg-customGreen text-white py-3 px-6 rounded-lg hover:bg-green-600"
                        >
                            Accept and Submit
                        </button>
                    </div>

                    {submissionSuccess && (
                        <p className="text-green-500 mt-4">{submissionSuccess}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnterUniqueCode;
