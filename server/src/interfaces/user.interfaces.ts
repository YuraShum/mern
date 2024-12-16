import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { GetAllUsersResponse, UserResponse } from "../types";

//!! Перевірити чи вказано валідні ролі
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    roles: Array<'Employee' | 'Admin' | 'User'>;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserController {
    getAllUsers(
        req: Request,
        res: GetAllUsersResponse,
        next: NextFunction,
    ): Promise<void>;

    createNewUser(
        req: Request,
        res: UserResponse,
        next: NextFunction,
    ): Promise<void>;

    updateUser(
        req: Request,
        res: UserResponse,
        next: NextFunction,
    ): Promise<void>;

    deleteUser(
        req: Request,
        res: Response<void>,
        next: NextFunction,
    ): Promise<void>;
}

export interface IUserService {
    getAllUsers(): Promise<IUser[] | null>;
    createNewUser(userData: Partial<IUser>): Promise<IUser | null>;
    updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<void>;
    checkDuplicateUser(username: string): Promise<IUser | null>;
    getUser(userId: string | mongoose.Types.ObjectId): Promise<IUser | null>;

}

//!! Змінити в подальшому партіал на більш строжий вибір формату передачі даних для створення користувача
export interface IUserRepository {
    getAll(): Promise<IUser[] | null>;
    createNewUser(userData: Partial<IUser>): Promise<IUser | null>;
    updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId: string): Promise<void>;
    checkDuplicateUser(username: string): Promise<IUser | null>;
    findUserById(userId: string | mongoose.Types.ObjectId): Promise<IUser | null>;
}