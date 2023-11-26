const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    emailOtp: String,
    isRegistered: {
        type: Boolean,
        default: false,
    },
    fullName: String,
    fatherName: String,
    email: String,
    city: String,
    village: String,
    education: String,
    employmentStatus: String,
    instaLink: String,
    fbLink: String,
    ytLink: String,
    otherFile: String,
    otherLink: String,
    workFile: [String],
}, {
    timestamps: true
});

module.exports = Registrations = mongoose.model('registrations', RegistrationSchema);