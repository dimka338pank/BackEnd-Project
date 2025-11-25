import { json } from 'express';
import {registerUser, loginUser} from '../services/auth.service.js';
import { success } from 'zod';

export const registration = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please, give username, email and password.'
        });
    }

    try
    {
        const newUser = await registerUser(username, email, password);
        return res.status(201).json({
            success: true,
            message: 'Registration successful!',
            user: newUser
        });
    } catch(error){
        if (error.message === 'Missing data') {
            return res.status(400).json({ success: false, message: 'Please, give username, email and password.' });
        }
        if (error.message === 'User already exists') {
            return res.status(409).json({ success: false, message: 'A user with this email is already registered' });
        }
        console.error("Registration Error:", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password)
    {
        return res.status(400).json({
            success: false,
            message: 'Please, give email and password.'
        })
    }
    try {
        const user = await loginUser(email, password);
        return res.status(200).json({
            success: true,
            message: 'Login is successful!',
            user: user
        });
    }catch(error) {
       if (error.message === 'User is not found' || error.message === 'Incorrect password') {
            return res.status(401).json({
                success:false,
                message: 'User is not authorized.'
            });
        }
        console.error("Login Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};








//     if (!username || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please, give username, email and password.'
//         });
//     }

//     const existingUser = users.find((u) => u.email === email || u.username === username);

//     if (existingUser) {
//         return res.status(409).json({
//             success: false,
//             message: 'User with this email or name exist already'
//         });
//     }

//     const newUser = {
//         id: Date.now(),
//         username,
//         email,
//         password
//     };

//     users.push(newUser);

//     return res.status(201).json({
//         success: true,
//         message: 'Registration successful!',
//         user: {
//             id: newUser.id,
//             username: newUser.username,
//             email: newUser.email
//         }
//     });

// export const login = (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please, give email and password.'
//         });
//     }

//     const user = users.find((u) => u.email === email);

//     if (!user) {
//         return res.status(401).json({
//             success: false,
//             message: "User with this email isn't registrated"
//         });
//     }

//     if (user.password !== password) {
//         return res.status(401).json({
//             success: false,
//             message: "Incorrect password."
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         message: "Login is successful!",
//         user: {
//             id: user.id,
//             username: user.username,
//             email: user.email
//         }
//     });
// };