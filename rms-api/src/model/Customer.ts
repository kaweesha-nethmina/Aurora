import { Schema, model } from 'mongoose';

// Define the Customer schema
const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contact_info: {
        email: {
            type: String,
            required: true,
            unique: true, // Ensure unique emails
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensure unique usernames
        },
        password: {
            type: String,
            required: true,
        },
    },
    phone: {
        type: String,
        required: true,
    },
});

// Create the Customer model with specific collection name
const Customer = model('Customer', customerSchema, 'customers');

export default Customer;
