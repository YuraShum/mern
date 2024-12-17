import { Response } from 'express';

import { IErrorResponse, IUser } from '../interfaces';

export type GetAllUsersResponse = Response<IUser[] | IErrorResponse>;

export type UserResponse = Response<IUser | IErrorResponse>;

export type DeleteUserResponse = Response<void | IErrorResponse>;
