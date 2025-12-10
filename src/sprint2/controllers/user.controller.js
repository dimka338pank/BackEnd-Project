import { GetProfileId, UpdateProfile } from "../services/user.service.js";

export const getProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const profileData = await GetProfileId(userId);
        return res.status(200).json(profileData);
    }catch (error) {
        console.error("GET Profile Error:", error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProfileController = async (req, res) => {
    const userId = req.userId;
    const updateData = req.body;
    
    try {
        const updatedProfile = await UpdateProfile(userId, updateData);
        return res.status(200).json(updatedProfile);
    }catch (error) {
        if (error.message === 'Email is already taken') {
            return res.status(409).json({ error: 'This email is already taken' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
    }