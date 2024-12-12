import { Request, Response, NextFunction } from "express";
import { IUser, IUserController, IUserService } from "../interfaces";
import { userService } from "../services";
import { SuccessHandler } from "../handlers";
import { GetAllUsersResponse } from "../types";

//!! Початковий варііант контроллера, в подальшому можна додати логування та детальне опрацювання помилок
class UserController implements IUserController {
    constructor(
        private userService: IUserService
    ) { }

    getAllUsers = async (
        _req: Request,
        res: GetAllUsersResponse,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();

            if (!users) {
                //!! додати хендлер обробки запитів, та додати бібліотеку http-status
                res.status(400).json({ message: "No users founds" })
                return

            }

            SuccessHandler.ok(res, { data: users });

        } catch (error) {
            next(error)
        }
    }

    //!! ДОдати тип із використанням message
    createNewUser = async (
        req: Request,
        res: Response<IUser | null>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { username, password, roles } = req.body
            //!! перевірити передачу ролей
            if (!username || !password || !Array.isArray(roles) || !roles.length) {
                res.status(400).json({ message: "All fealds are required" })
                return
            }
            const newUser = await this.userService.createNewUser(userData);

            // додати опрацювання відповіді
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (
        req: Request,
        res: Response<IUser | null>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId } = req.params;
            const userData = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData)
            // додати опрацювання відповіді
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (
        req: Request,
        res: Response<void>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId } = req.params;
            await this.userService.deleteUser(userId)
            //додати опрацювання відповіді
        } catch (error) {
            next(error)
        }
    }

}

export const userController = new UserController(userService)