import { Request, Response } from 'express';
import Customer from '../model/Customer';
import bcrypt from 'bcrypt';
import { generateToken } from './../utils/token';

export const signup = async (req: Request, res: Response) => {
    const { firstName, lastName, email, username, password, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
            firstName,
            lastName,
            contact_info: {
                email,
                username,
                password: hashedPassword,
            },
            phone,
        });
        
        await newCustomer.save();
        res.status(201).json({ message: 'Customer registered successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ 'contact_info.username': username });
        if (!customer) return res.status(404).json({ message: 'User not found' });

        // Check if contact_info is not null or undefined
        if (!customer.contact_info) {
            return res.status(404).json({ message: 'Contact info not found' });
        }

        const isMatch = await bcrypt.compare(password, customer.contact_info.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a token
        const token = generateToken(customer._id.toString());

        // Return both token and customer details
        res.status(200).json({
            message: 'Login successful',
            token,
            customer: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                contact_info: {
                    email: customer.contact_info.email,
                    username: customer.contact_info.username,
                },
                phone: customer.phone,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
