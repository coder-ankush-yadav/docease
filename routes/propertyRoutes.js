const express = require('express');
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');
const { sendInterestEmail } = require('../services/emailService'); // Import the new email service

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Saving file to uploads folder...');
        cb(null, 'uploads/'); // Save files to 'uploads' folder
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        console.log(`Generated filename for ${file.fieldname}: ${filename}`);
        cb(null, filename); // Save with timestamp + extension
    }
});
const upload = multer({ storage });

// Helper function to generate a unique 4-digit code
const generateUniqueCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit code
    console.log(`Generated unique code: ${code}`);
    return code;
};

// Add a new property with images and owner information
router.post('/add-property', upload.fields([
    { name: 'gateImage', maxCount: 1 },
    { name: 'interiorImage', maxCount: 1 },
    { name: 'kitchenImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { address, deposit, rent, paymentDueDate, userEmail, userType } = req.body;

        if (!address || !deposit || !rent || !paymentDueDate || !userEmail || !userType) {
            console.error('Validation error: Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log(`Processing property for owner ${userEmail}, address: ${address}, rent: ${rent}, deposit: ${deposit}`);

        // Generate a unique code for the property
        const uniqueCode = generateUniqueCode();

        // Log the received images and their paths
        if (req.files) {
            console.log('Gate Image Path:', req.files['gateImage'] ? req.files['gateImage'][0].path : 'No Gate Image');
            console.log('Interior Image Path:', req.files['interiorImage'] ? req.files['interiorImage'][0].path : 'No Interior Image');
            console.log('Kitchen Image Path:', req.files['kitchenImage'] ? req.files['kitchenImage'][0].path : 'No Kitchen Image');
        }

        // Save property details with image paths and owner information
        const newProperty = new Property({
            address,
            deposit,
            rent,
            paymentDueDate,
            uniqueCode,
            ownerEmail: userEmail, // Store the owner's email
            userType, // Store the user's type (owner)
            gateImage: req.files['gateImage'] ? req.files['gateImage'][0].path : '',
            interiorImage: req.files['interiorImage'] ? req.files['interiorImage'][0].path : '',
            kitchenImage: req.files['kitchenImage'] ? req.files['kitchenImage'][0].path : ''
        });

        console.log('Saving new property to the database...');
        await newProperty.save();
        console.log('Property saved successfully:', newProperty);

        res.status(200).json({
            message: 'Property added successfully!',
            property: newProperty,
            uniqueCode
        });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch properties for a specific owner by email
router.get('/owner/email/:ownerEmail', async (req, res) => {
    try {
        const { ownerEmail } = req.params;
        console.log(`Fetching properties for owner email: ${ownerEmail}`);

        // Find properties by owner email
        const properties = await Property.find({ ownerEmail: ownerEmail });

        if (!properties.length) {
            return res.status(404).json({ message: 'No properties found' });
        }

        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch properties for tenant search (properties that have owner email)
router.get('/for-search', async (req, res) => {
    try {
        const properties = await Property.find({ ownerEmail: { $exists: true } }); // Find all properties with an owner email
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties for search:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to handle showing interest and sending email to property owner
// Route to handle showing interest and sending email to property owner
router.post('/show-interest', async (req, res) => {
    const { propertyId, tenantEmail, tenantName } = req.body;

    try {
        // Fetch the property details by propertyId
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const ownerEmail = property.ownerEmail; // Fetch the owner's email from the property data
        const propertyAddress = property.address; // Fetch the property address from the property data

        if (!ownerEmail) {
            return res.status(400).json({ message: 'Owner email not found for this property' });
        }

        // Use the email service to send the email
        await sendInterestEmail(ownerEmail, tenantEmail, tenantName, propertyAddress);
        console.log(`Email sent to ${ownerEmail} about interest in property ${propertyAddress}`);

        res.status(200).json({ success: true, message: 'Interest shown successfully, and email sent to the owner.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
