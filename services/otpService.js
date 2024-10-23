// Generate a random 6-digit OTP
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit number
    console.log(`Generated OTP: ${otp}`); // Log the OTP in the backend console
    return otp;
};

module.exports = { generateOtp };
