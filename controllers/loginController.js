const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jwt for token generation

// Login user (tenant or owner)
const login = async (req, res) => {
    const { userType, email, password } = req.body;

    // Log the received login details
    console.log('Login attempt received:', { userType, email });

    // Input validation
    if (!userType || !email || !password) {
        console.log('Missing fields during login');
        return res.status(400).json({ msg: 'Please provide all required fields.' });
    }

    try {
        // Check if the user exists based on the provided email and userType
        console.log(`Checking if user exists for email: ${email} and userType: ${userType}`);
        const user = await User.findOne({ email, userType });
        if (!user) {
            console.log(`User not found or incorrect userType for email: ${email}`);
            return res.status(400).json({ msg: 'User not found or incorrect user type selected.' });
        }

        // Check if the password matches the stored hashed password
        console.log(`Checking password for user: ${email}`);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Incorrect password for user: ${email}`);
            return res.status(400).json({ msg: 'Incorrect password.' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // If login is successful, log and return success message with token
        console.log(`Login successful for user: ${email} as ${userType}`);
        res.status(200).json({
            msg: `Login successful as ${userType}!`,
            token, // Send the token to the frontend
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
            },
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
};

module.exports = { login };
