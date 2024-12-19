import { Response } from 'express';

import { IErrorResponse, IUser } from '../interfaces';

export type GetAllUsersResponse = Response<IUser[] | IErrorResponse>;

export type UserResponse = Response<IUser | IErrorResponse>;

export type DeleteUserResponse = Response<void | IErrorResponse>;

export type UserCreateFields = Pick<IUser, 'username' | 'password' | 'roles'>;

export type UserUpdateFields = Pick<
    IUser,
    'username' | 'roles' | 'active' | 'password'
>;
