import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (username, email, password) => {

    if (!username) throw new Error('Username is required'); 
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return { access_token: token, id: user.id, username, email: user.email };
};


export const loginUser = async (email, password) => {

    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('User is not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        access_token: token,
        user: { id: user.id, username: user.username, email: user.email }
    };
};
