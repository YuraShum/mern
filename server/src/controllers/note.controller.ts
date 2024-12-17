import { Request, NextFunction } from 'express';

import { INoteConroller } from '../interfaces';
import { noteService, NoteService } from '../services';
import { DeleteNoteResponse, GetAllNoteResponse, NoteResponse } from '../types';
import { SuccessHandler } from '../handlers';

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
            next(error);
        }
    };

    createNewNote = async (
        req: Request,
        res: NoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { user, title, text } = req.body;

            if (!user || !title || !text) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }

            const duplicate = await this.noteService.checkDuplicateNote(title);

            if (duplicate) {
                res.status(409).json({ message: 'Duplicate note title' });
                return;
            }

            const newNote = await this.noteService.createNote({
                user,
                title,
                text,
            });

            if (!newNote) {
                res.status(400).json({ message: 'Invalid note data received' });
                return;
            } else {
                SuccessHandler.created(res, { data: newNote });
            }
        } catch (error) {
            next(error);
        }
    };

    updateNote = async (
        req: Request,
        res: NoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { noteId, user, title, text, completed } = req.body;

            if (
                !noteId ||
                !user ||
                !title ||
                !text ||
                typeof completed != 'boolean'
            ) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }

            const note = await this.noteService.getNote(noteId);

            if (!note) {
                res.status(400).json({ message: 'Note not found' });
                return;
            }

            const duplicate = await this.noteService.checkDuplicateNote(title);

            if (duplicate && duplicate?._id.toString() !== noteId) {
                res.status(409).json({ message: 'Duplicate note title' });
                return;
            }

            const updatedNote = await this.noteService.updateNote(noteId, {
                user,
                title,
                text,
                completed,
            });
            if (!updatedNote) {
                res.status(400).json({ message: 'Failed to update note' });
                return;
            }
            SuccessHandler.ok(res, { data: updatedNote });
        } catch (error) {
            next(error);
        }
    };

    deleteNote = async (
        req: Request,
        res: DeleteNoteResponse,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { noteId } = req.body;
            if (!noteId) {
                res.status(400).json({ message: 'Note ID required' });
                return;
            }

            const note = await this.noteService.getNote(noteId);
            if (!note) {
                res.status(400).json({ message: 'Note not found' });
                return;
            }

            await this.noteService.deleteNote(noteId);
            SuccessHandler.noContent(res);
        } catch (error) {
            next(error);
        }
    };
}

export const noteController = new NoteController(noteService);
