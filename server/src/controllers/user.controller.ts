import { Request, NextFunction } from 'express';
import status from 'http-status';

import { IUserController, IUserService } from '../interfaces';
import { userService } from '../services';
import { SuccessHandler } from '../handlers';
import {
    DeleteUserResponse,
    GetAllUsersResponse,
    UserResponse,
} from '../types';
import { ApiError } from '../errors';
import {
    CREATE_NEW_USER_MESSAGE,
    CREATE_NEW_USER_MESSAGE_ERROR,
    CREATE_NEW_USER_METHOD,
    DELETE_USER_MESSAGE_ERROR,
    DELETE_USER_METHOD,
    GET_ALL_USERS_MESSAGE,
    GET_ALL_USERS_METHOD,
    INTERNAL_SERVER_ERROR,
    UPDATE_USER_MESSAGE_ERROR,
    UPDATE_USER_METHOD,
} from '../constants';

class UserController implements IUserController {
    constructor(private userService: IUserService) {}

    getAllUsers = async (
        _req: Request,
        res: GetAllUsersResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            SuccessHandler.ok(res, { data: users });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                GET_ALL_USERS_MESSAGE,
                GET_ALL_USERS_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    createNewUser = async (
        req: Request,
        res: UserResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { username, password, roles } = req.body;

            const newUser = await this.userService.createNewUser({
                username,
                password,
                roles,
            });

            if (!newUser) {
                const error = new ApiError(
                    CREATE_NEW_USER_MESSAGE,
                    CREATE_NEW_USER_MESSAGE,
                    CREATE_NEW_USER_METHOD,
                    status.BAD_REQUEST,
                    true,
                );
                return next(error);
            }
            SuccessHandler.created(res, { data: newUser });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                CREATE_NEW_USER_MESSAGE_ERROR,
                CREATE_NEW_USER_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    updateUser = async (
        req: Request,
        res: UserResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { userId, username, roles, active, password } = req.body;

            const updatedUser = await this.userService.updateUser(userId, {
                username,
                roles,
                active,
                password,
            });
            SuccessHandler.ok(res, { data: updatedUser });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                UPDATE_USER_MESSAGE_ERROR,
                UPDATE_USER_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    deleteUser = async (
        req: Request,
        res: DeleteUserResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { userId } = req.body;

            await this.userService.deleteUser(userId);
            SuccessHandler.noContent(res);
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                DELETE_USER_MESSAGE_ERROR,
                DELETE_USER_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };
}

export const userController = new UserController(userService);
