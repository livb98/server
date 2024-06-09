import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const generateUserSecret = (userId) => {

    return bcrypt.hashSync(userId, 10);
};

export const generateAccessToken = (userId) => {

    const userSecret = generateUserSecret(userId);


    const accessToken = jwt.sign(
        { id: userId },
        userSecret,
        { expiresIn: '1h' }
    );

    return accessToken;
};

export const verifiedToken = (accessToken, userId) => {

    const userSecret = generateUserSecret(userId);

    try {
    
        const decoded = jwt.verify(accessToken, userSecret);
        return decoded;
    } catch (error) {
        return null;
    }
};
