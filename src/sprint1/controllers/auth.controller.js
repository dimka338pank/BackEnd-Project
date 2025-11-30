import {registerUser, loginUser} from '../services/auth.service.js';

export const registration = async (req, res) => {
    const { username, email, password } = req.body;

    try
    {
        const result = await registerUser(username, email, password);
        return res.status(201).json({
            success: true,
            message: 'Registration successful!',
            access_token: result.access_token,
            user: result.user
        });
    } catch(error){
        if (error.message === 'Username is required') {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }
        else if (error.message === 'Email is required') {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        else if (error.message === 'Password is required') {
            return res.status(400).json({ success: false, message: 'Password is required' });
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
