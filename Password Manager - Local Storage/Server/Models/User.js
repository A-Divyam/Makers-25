const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a sub-schema for credentials
const CredentialSchema = new Schema({
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encKey: {
        type: String,
        required: true
    }
}, { _id: true, timestamps: true }); // This will add createdAt and updatedAt fields

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    enrollmentNo: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    creds: [CredentialSchema] // Array of credentials
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;