import { users } from "../db/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "YOUR_SECRET_KEY_HERE";

export const registerUser = async (username, email, password) => {
    if (!username || !email || !password) 
    {
        throw new Error('Missing data'); 
    }

    const existingUser = users.find(u => u.email === email || u.username === username );

    if (existingUser) 
    {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = 
    {
        id: Date.now(),
        username,
        email,
        password:hashedPassword,
    };
    users.push(newUser);

    return { id: newUser.id, username, email: newUser.email };
};

export const loginUser = async (email, password) => {
    const user = users.find(u => u.email === email);

    if (!user) 
    {
        throw new Error('User is not found');
    }
    const IsMatch = bcrypt.compare(password, user.password)
    if (!IsMatch) 
    {
        throw new Error('Incorrect password');
    }
    return{
        id: user.id,
        username: user.username,
        email: user.email
    }
};