import mongoose, { Model } from 'mongoose';

import { IUser } from '../interfaces';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            default: 'Employee',
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
});

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { userModel };
