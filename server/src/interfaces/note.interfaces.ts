import { NextFunction, Request } from "express";
import mongoose from "mongoose";
import { CreateNoteBody, DeleteNoteResponse, GetAllNoteResponse, NoteResponse, UpdateNoteBody } from "../types";

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


export interface INoteConroller {
    getAllNotes(
        req: Request,
        res: GetAllNoteResponse,
        next: NextFunction
    ): Promise<void>;

    createNewNote(
        req: Request,
        res: NoteResponse,
        next: NextFunction
    ): Promise<void>;

    updateNote(
        req: Request,
        res: NoteResponse,
        next: NextFunction
    ): Promise<void>;

    deleteNote(
        req: Request,
        res: DeleteNoteResponse,
        next: NextFunction
    ): Promise<void>
}

export interface INoteService {
    getAllNotes():  Promise<(INote & { username: string | undefined })[] | null>
    getAllUserNotes(userId: string): Promise<INote[] | null>;
    getNote(noteId: string): Promise<INote | null>;
    checkDuplicateNote(title: string): Promise<INote | null>;
    createNote(noteBody: CreateNoteBody): Promise<INote | null>;
    updateNote(noteId: string, updateNoteBody: UpdateNoteBody): Promise<INote | null>;
    deleteNote(noteId: string): Promise<void>;

}

export interface INoteRepository {
    getAll(): Promise<INote[] | null>;
    getAllUserNotes(userId: string): Promise<INote[] | null>;
    getNoteById(noteId: string): Promise<INote | null>;
    checkDuplicateNote(title: string): Promise<INote | null>;
    createNewNote(noteBody: CreateNoteBody): Promise<INote | null>;
    updateNote(noteId: string, updateNoteBody: UpdateNoteBody): Promise<INote | null>;
    deleteNote(noteId: string): Promise<void>;
}