import { Request, NextFunction } from 'express';
import status from 'http-status';

import { INoteConroller } from '../interfaces';
import { noteService, NoteService } from '../services';
import { DeleteNoteResponse, GetAllNoteResponse, NoteResponse } from '../types';
import { SuccessHandler } from '../handlers';
import { ApiError } from '../errors';
import {
    CREATE_NEW_NOTE_MESSAGE,
    CREATE_NEW_NOTE_METHOD,
    DELETE_NOTE_MESSAGE,
    DELETE_NOTE_METHOD,
    GET_ALL_NOTES_MESSAGE,
    GET_ALL_NOTES_METHOD,
    INTERNAL_SERVER_ERROR,
    UPDATE_NOTE_MESSAGE,
    UPDATE_NOTE_METHOD,
} from '../constants';

class NoteController implements INoteConroller {
    constructor(private noteService: NoteService) {}

    getAllNotes = async (
        _req: Request,
        res: GetAllNoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const notes = await this.noteService.getAllNotes();
            SuccessHandler.ok(res, { data: notes });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                GET_ALL_NOTES_MESSAGE,
                GET_ALL_NOTES_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    createNewNote = async (
        req: Request,
        res: NoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const newNote = await this.noteService.createNote(req.body);
            SuccessHandler.created(res, { data: newNote });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                CREATE_NEW_NOTE_MESSAGE,
                CREATE_NEW_NOTE_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    updateNote = async (
        req: Request,
        res: NoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { noteId, user, title, text, completed } = req.body;

            const updatedNote = await this.noteService.updateNote(noteId, {
                user,
                title,
                text,
                completed,
            });
            SuccessHandler.ok(res, { data: updatedNote });
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                UPDATE_NOTE_MESSAGE,
                UPDATE_NOTE_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };

    deleteNote = async (
        req: Request,
        res: DeleteNoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { noteId } = req.body;

            await this.noteService.deleteNote(noteId);
            SuccessHandler.noContent(res);
        } catch (error) {
            if (error instanceof ApiError) {
                return next(error);
            }
            const err = new ApiError(
                INTERNAL_SERVER_ERROR,
                DELETE_NOTE_MESSAGE,
                DELETE_NOTE_METHOD,
                status.INTERNAL_SERVER_ERROR,
            );
            next(err);
        }
    };
}

export const noteController = new NoteController(noteService);
