import { Response } from "express";
import { IErrorResponse, IUser } from "../interfaces";

export type GetAllUsersResponse = Response<IUser[] | IErrorResponse>