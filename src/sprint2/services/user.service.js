import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';
const JWT_SECRET = 'YOUR_SECRET_KEY_HERE';

export const createUser = async (username, email, password) => {
    if (!username) {
        throw new Error('Username is required');
    }
    if (!email) {
        throw new Error('Email is required');
    }
    if (!password) {
        throw new Error('Password is required');
    }
}