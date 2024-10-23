const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    paymentDueDate: {
        type: Date,
        required: true
    },
    gateImage: {
        type: String,
        required: true
    },
    interiorImage: {
        type: String,
        required: true
    },
    kitchenImage: {
        type: String,
        required: true
    },
    uniqueCode: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true // Store the email ID of the user who added the property
    },
    userType: {
        type: String,
        required: true // Store the user type (e.g., owner or tenant)
    }
});

module.exports = mongoose.model('Property', PropertySchema);
