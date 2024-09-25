import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) for a user.
 * @param userId - The ID of the user to include in the token payload.
 * @returns The generated JWT.
 */
export const generateToken = (userId: string): string => {
    // Make sure to replace 'your_jwt_secret' with an actual secret key
    // Ideally, you should store this secret in an environment variable
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';

    // Sign the token with the user ID and specify options
    return jwt.sign({ id: userId }, secret, {
        expiresIn: '1h', // Token expiration time
    });
};
