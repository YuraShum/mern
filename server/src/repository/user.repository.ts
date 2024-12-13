import { IUser, IUserRepository } from "../interfaces";
import { userModel } from "../models";

export class UserRepository implements IUserRepository {
    async getAll(): Promise<IUser[] | null> {
        return userModel.find().select('-password ').exec();
    }

    //!! в подальшому додати більш строгі обмеження на поря 
    async createNewUser(userData: Partial<IUser>): Promise<IUser | null> {
        const newUser = await userModel.create(userData)
        return newUser
    }

    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        const updateUser = await userModel
            .findByIdAndUpdate({ _id: userId }, userData, {
                new: true,
                lean: true,
            })
            .exec();
        return updateUser as IUser | null;
    }

    async deleteUser(userId: string): Promise<void> {
        await userModel.findByIdAndDelete({ _id: userId }).exec();
    }

    async checkDuplicateUser(username: string): Promise<IUser | null> {
        return userModel.findOne({ username }).exec();
    }
    async findUserById(userId: string): Promise<IUser | null> {
        return userModel.findById({ _id: userId }).exec();
    }

}
export const userRepository = new UserRepository()