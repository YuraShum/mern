import { Request, NextFunction } from "express";
import { IUserController, IUserService } from "../interfaces";
import { userService } from "../services";
import { SuccessHandler } from "../handlers";
import { DeleteUserResponse, GetAllUsersResponse, UserResponse } from "../types";
import bcrypt from 'bcrypt'
import { noteModel } from "../models";


//!! Початковий варіант контроллера, в подальшому можна додати логування та детальне опрацювання помилок
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
            SuccessHandler.ok(res, { data: users });

        } catch (error) {
            next(error)
        }
    }

    createNewUser = async (
        req: Request,
        res: UserResponse,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { username, password, roles } = req.body
            //!! перевірити передачу ролей
            if (!username || !password || !Array.isArray(roles) || !roles.length) {
                res.status(400).json({ message: "All fealds are required" })
                return
            }

            {/* Check for duplicate */ }
            const duplicate = await this.userService.checkDuplicateUser(username)
            if (duplicate) {
                res.status(409).json({ message: "Duplicate Username" })
                return
            }

            //!! винести в окремий файл
            {/* Hash password */ }
            const hashedPassword = await bcrypt.hash(password, 10)
            const userData = {
                username,
                password: hashedPassword,
                roles
            }
            {/* create new user */ }
            const newUser = await this.userService.createNewUser(userData);
            if (newUser) {
                SuccessHandler.created(res, { data: newUser })
            } else {
                res.status(400).json({ message: 'Invalid user data received' })
            }

            // додати опрацювання відповіді
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (
        req: Request,
        res: UserResponse,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId, username, roles, active, password } = req.body

            {/* confirm data */ }
            if (!userId || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
                res.status(400).json({ message: "All fields are required" })
                return
            }
            const user = await this.userService.getUser(userId)
            console.log("User", user)

            if (!user) {
                res.status(400).json({ message: "User not found" })
                return
            }
            {/* check for duplicate */ }
            const duplicate = await this.userService.checkDuplicateUser(username)

            {/* Allow updates to the original user */ }
            if (duplicate && duplicate?._id.toString() !== userId) {
                res.status(400).json({ message: "Duplicate username" })
                return
            }
            const userData = {
                username,
                roles,
                active,
                password
            }

            if (password) {
                {/** Has password */ }
                userData.password = await bcrypt.hash(password, 10)
            }
            const updatedUser = await this.userService.updateUser(userId, userData)
            SuccessHandler.ok(res, {data: updatedUser})
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (
        req: Request,
        res: DeleteUserResponse,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId } = req.body;
            if(!userId){
                res.status(400).json({message: 'User id is required'})
            }

            //!! винести в notes controller

            const note = await noteModel.findOne({user: userId}).exec()
            if(note){
                res.status(400).json({message: 'User has assigned notes'})
                return
            }
            const user = await this.userService.getUser(userId)

            if(!user){
                res.status(400).json({ message: "User not found" })
                return
            }

            await this.userService.deleteUser(userId)
            SuccessHandler.noContent(res)
            //додати опрацювання відповіді
        } catch (error) {
            next(error)
        }
    }

}

export const userController = new UserController(userService)