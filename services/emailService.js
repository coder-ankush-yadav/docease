const nodemailer = require('nodemailer');

// Configure NodeMailer transporter using Gmail's SMTP with app-specific password
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP
    port: 465, // 465 for secure connection
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env
        pass: process.env.EMAIL_PASS, // Your app-specific password from .env
    },
});

// Send OTP to user
const sendOtpEmail = async (email, otp) => {
    console.log(`Sending OTP to ${email}`); // Log email address where OTP is sent

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code for Verification',
        text: `Your OTP is ${otp}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully to ${email}`); // Success log
    } catch (error) {
        console.log(`Error sending OTP to ${email}:`, error.message); // Error log
        throw error;
    }
};

// Notify admin about new user registration
const notifyAdmin = async (user) => {
    console.log(`Notifying admin about new user: ${user.email}`); // Log notification

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New User Registered',
        text: `A new user has registered:\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Admin notified successfully about new user: ${user.email}`); // Success log
    } catch (error) {
        console.log(`Error notifying admin:`, error.message); // Error log
        throw error;
    }
};

// Send email to the property owner when tenant shows interest
const sendInterestEmail = async (ownerEmail, tenantEmail, tenantName, propertyAddress) => {
    console.log(`Sending interest email to ${ownerEmail} from ${tenantEmail}`); // Log email addresses

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ownerEmail, // Owner's email
        subject: `Interest shown in your property: ${propertyAddress}`,
        text: `Hello, \n\n${tenantName} (Email: ${tenantEmail}) has shown interest in your property at ${propertyAddress}. \n\nPlease contact them for further discussion.\n\nThank you!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Interest email sent successfully to ${ownerEmail}`); // Success log
    } catch (error) {
        console.log(`Error sending interest email to ${ownerEmail}:`, error.message); // Error log
        throw error;
    }
};

module.exports = { sendOtpEmail, notifyAdmin, sendInterestEmail };
