const otpService = require('../services/otpService');
const emailService = require('../services/emailService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const tempStorage = {}; // Temporary storage for user data

// Send OTP to user's email
const sendOtp = async (req, res) => {
    const { firstName, lastName, email, phone, userType } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !phone || !userType) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User is already registered.' });
        }

        const otp = otpService.generateOtp();

        // Temporarily store user data
        tempStorage[email] = { firstName, lastName, phone, userType, otp };

        // Send OTP
        await emailService.sendOtpEmail(email, otp);
        res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to send OTP' });
    }
};

// Verify OTP entered by the user
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedData = tempStorage[email];
    if (!storedData || storedData.otp !== otp) {
        return res.status(400).json({ msg: 'Invalid OTP. Please try again.' });
    }

    res.status(200).json({ msg: 'OTP verified. Proceed to create a password.' });
};

// Set password after OTP verification
const setPassword = async (req, res) => {
    const { email, password } = req.body;

    const storedData = tempStorage[email];
    if (!storedData) {
        return res.status(400).json({ msg: 'OTP not verified or session expired' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = new User({
            firstName: storedData.firstName,
            lastName: storedData.lastName,
            email,
            phone: storedData.phone,
            password: hashedPassword,
            userType: storedData.userType,
            status: 'verified'
        });

        await newUser.save();
        delete tempStorage[email]; // Clear temporary data

        await emailService.notifyAdmin(newUser);

        res.status(200).json({ msg: 'User registered successfully!' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ msg: 'User already exists. Please log in.' });
        }
        res.status(500).json({ msg: 'Server error. Failed to register user.' });
    }
};

module.exports = { sendOtp, verifyOtp, setPassword };
