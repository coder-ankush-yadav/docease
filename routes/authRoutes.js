const express = require('express');
const { sendOtp, verifyOtp, setPassword } = require('../controllers/authController');
const { login } = require('../controllers/loginController'); // Import login function from loginController.js
const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to verify OTP
router.post('/verify-otp', verifyOtp);

// Route to set password after OTP verification
router.post('/set-password', setPassword);

// Route to handle login (tenant/owner)
router.post('/login', login); // New route for login

module.exports = router;
