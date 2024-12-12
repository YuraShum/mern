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
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            userData,
            {
                new: true,
                lean: true,
            }
        )
        return updateUser as IUser | null;
    }

    async deleteUser(userId: string): Promise<void> {
        await userModel.findByIdAndDelete(userId)
    }

}
export const userRepository = new UserRepository()