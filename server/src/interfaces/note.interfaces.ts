import mongoose from "mongoose";

export interface INote extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    title: string;
    text: string;
    completed: boolean;
    ticket: number;
    createdAt?: Date;
    updatedAt?: Date;
}