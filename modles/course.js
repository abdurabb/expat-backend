const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Course Name is Required']
    },
    description: {
        type: String,
        required: [true, 'Description is Required']
    },
    price: {
        type: Number,
        required: [true, 'Price is Required']
    },
    discount: {
        type: String,
    },
    duration: {
        type: String,
        required: [true, 'Duration is Required']
    },
    level: {
        type: String,
        required: [true, 'Level is Required']
    },
    certification: {
        type: String,
        default: "No"
    },
    mentor: {
        type: String,
        required: [true, 'Mentor is Required']
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact Number is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
