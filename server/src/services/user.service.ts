import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import status from 'http-status';

import {
    INoteRepository,
    IUser,
    IUserRepository,
    IUserService,
} from '../interfaces';
import { noteRepository, userRepository } from '../repository';
import { UserCreateFields } from '../types';
import { ApiError } from '../errors';
import {
    DUPLICATE_USERNAME_MESSAGE,
    DUPLICATE_USERNAME_METHOD,
    SERVICE_DELETE_USER_METHOD,
    SERVICE_UPDATE_USER_METHOD,
    USER_HAS_ASSIGNED_NOTES_MESSAGE,
    USER_NOT_FOUND_MESSAGE,
} from '../constants';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private noteRepository: INoteRepository,
    ) {}

    async getAllUsers(): Promise<IUser[] | null> {
        return this.userRepository.getAll();
    }

    async createNewUser(userData: UserCreateFields): Promise<IUser | null> {
        const { username, password, roles } = userData;

        const duplicate =
            await this.userRepository.checkDuplicateUser(username);
        if (duplicate) {
            throw new ApiError(
                DUPLICATE_USERNAME_MESSAGE,
                DUPLICATE_USERNAME_MESSAGE,
                DUPLICATE_USERNAME_METHOD,
                status.BAD_REQUEST,
                true,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.userRepository.createNewUser({
            username,
            password: hashedPassword,
            roles,
        });
    }

    async updateUser(
        userId: string,
        userData: Partial<IUser>,
    ): Promise<IUser | null> {
        const { username, password } = userData;

        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new ApiError(
                USER_NOT_FOUND_MESSAGE,
                USER_NOT_FOUND_MESSAGE,
                SERVICE_UPDATE_USER_METHOD,
                status.NOT_FOUND,
                true,
            );
        }

        const duplicate = await this.userRepository.checkDuplicateUser(
            username as string,
        );
        if (duplicate && duplicate._id.toString() !== userId) {
            throw new ApiError(
                DUPLICATE_USERNAME_MESSAGE,
                DUPLICATE_USERNAME_MESSAGE,
                SERVICE_UPDATE_USER_METHOD,
                status.BAD_REQUEST,
                true,
            );
        }

        if (password) {
            userData.password = await bcrypt.hash(password, 10);
        }

        return this.userRepository.updateUser(userId, userData);
    }

    async deleteUser(userId: string): Promise<void> {
        const note = await this.noteRepository.getAllUserNotes(userId);
        if (note && note.length < 1) {
            throw new ApiError(
                USER_HAS_ASSIGNED_NOTES_MESSAGE,
                USER_HAS_ASSIGNED_NOTES_MESSAGE,
                SERVICE_DELETE_USER_METHOD,
                status.BAD_REQUEST,
                true,
            );
        }

        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new ApiError(
                USER_NOT_FOUND_MESSAGE,
                USER_NOT_FOUND_MESSAGE,
                SERVICE_DELETE_USER_METHOD,
                status.NOT_FOUND,
                true,
            );
        }

        await this.userRepository.deleteUser(userId);
    }

    async checkDuplicateUser(username: string): Promise<IUser | null> {
        return this.userRepository.checkDuplicateUser(username);
    }

    async getUser(
        userId: string | mongoose.Types.ObjectId,
    ): Promise<IUser | null> {
        return this.userRepository.findUserById(userId);
    }
}

export const userService = new UserService(userRepository, noteRepository);
