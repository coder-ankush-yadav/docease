const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log("In Db.js file, line no 11");
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
