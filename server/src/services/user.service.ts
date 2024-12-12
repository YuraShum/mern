import { IUser, IUserRepository, IUserService } from "../interfaces";
import { userRepository } from "../repository";


//!! Пододавати оброблення помилок
export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async getAllUsers(): Promise<IUser[] | null> {
        return this.userRepository.getAll()
    }

    async createNewUser(userData: Partial<IUser>): Promise<IUser | null> {
        return this.userRepository.createNewUser(userData)
    }

    async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
        return this.userRepository.updateUser(userId, userData)
    }

    async deleteUser(userId: string): Promise<void> {
        return this.userRepository.deleteUser(userId)
    }
    
}

export const userService = new UserService(userRepository)