import { User } from '../../sprint1/models/user.model.js';
import bcrypt from 'bcrypt';

export const GetProfileId = async (UserID) => {
const user = await User.findByPk(UserID, {
        attributes: [
            'email', 
            ['username', 'name']
        ],
        raw: true,
    });
    if (!user)throw new Error('User not found');
    return {
        email: user.email,
        name: user.name
    }
}
export const UpdateProfile = async (userId, updateData) => {
    const dataToUpdate = { ...updateData };
    const user = await User.findByPk(userId);
    if (!user)throw new Error('User not found');
    
    if (dataToUpdate.password)dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);

    if (dataToUpdate.email){
        const existingUser = await User.findOne({where: { email: dataToUpdate.email } });
        if (existingUser && existingUser.id !== userId)throw new Error('Email already in use');
    }
const [updatedRows] = await User.update(dataToUpdate, {
        where: {id: userId},
    });

    if (updatedRows === 0)throw new Error('Update failed or no changes provided');

    const updatedUser = await User.findByPk(userId, {
        attributes: ['email', ['username', 'name']],
        raw: true,
    });

    return {
        email: updatedUser.email,
        name: updatedUser.name
    };
}