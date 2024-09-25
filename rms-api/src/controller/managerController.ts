// controllers/managerController.ts
import Manager from '../model/Manager';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// Signup
export const signup = async (req: Request, res: Response) => {
    const { username, password, email, firstName, lastName, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newManager = new Manager({ username, password: hashedPassword, email, firstName, lastName, phone });
        await newManager.save();
        res.status(201).json({ message: 'Manager created successfully.' });
    } catch (error: unknown) { // Specify error as unknown
        if (error instanceof Error) { // Check if error is an instance of Error
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const manager = await Manager.findOne({ username });
        if (!manager) return res.status(404).json({ message: 'Manager not found.' });

        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: manager._id }, 'yourSecretKey', { expiresIn: '1h' });
        res.status(200).json({ token, manager });
    } catch (error: unknown) { // Specify error as unknown
        if (error instanceof Error) { // Check if error is an instance of Error
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};
