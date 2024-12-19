import status from 'http-status';

import {
    DUPLICATE_NOTE_TITLE,
    DUPLICATE_NOTE_TITLE_METHOD,
    NOTE_DOES_NOT_EXIST_MESSAGE,
    NOTE_NOT_FOUND_MESSAGE,
    SERVICE_DELETE_NOTE_METHOD,
    SERVICE_GET_ALL_NOTES_METHOD,
    SERVICE_GET_NOTE_METHOD,
    SERVICE_UPDATE_NOTE,
    USER_NOT_FOUND_MESSAGE,
} from '../constants';
import { ApiError } from '../errors';
import { INote, INoteService } from '../interfaces';
import { noteRepository, NoteRepository } from '../repository';
import { CreateNoteBody, UpdateNoteBody } from '../types';
import { userService, UserService } from './user.service';

export class NoteService implements INoteService {
    constructor(
        private noteRepository: NoteRepository,
        private userService: UserService,
    ) {}

    async getAllNotes(): Promise<(INote & { username: string })[] | null> {
        const notes = await this.noteRepository.getAll();

        if (notes?.length) {
            const notesWithUser = await Promise.all(
                notes.map(async note => {
                    const user = await this.userService.getUser(note.user);
                    if (!user) {
                        throw new ApiError(
                            USER_NOT_FOUND_MESSAGE,
                            USER_NOT_FOUND_MESSAGE,
                            SERVICE_GET_ALL_NOTES_METHOD,
                            status.NOT_FOUND,
                            true,
                        );
                    }

                    return { ...note, username: user?.username };
                }),
            );

            return notesWithUser;
        }
        return [];
    }

    getAllUserNotes(userId: string): Promise<INote[] | null> {
        return this.noteRepository.getAllUserNotes(userId);
    }

    async getNote(noteId: string): Promise<INote | null> {
        const note = await this.noteRepository.getNoteById(noteId);
        if (!note) {
            throw new ApiError(
                NOTE_DOES_NOT_EXIST_MESSAGE,
                NOTE_DOES_NOT_EXIST_MESSAGE,
                SERVICE_GET_NOTE_METHOD,
                status.NOT_FOUND,
                true,
            );
        }
        return note;
    }

    async checkDuplicateNote(title: string): Promise<INote | null> {
        return this.noteRepository.checkDuplicateNote(title);
    }

    async createNote(noteBody: CreateNoteBody): Promise<INote | null> {
        const { title } = noteBody;

        const duplicate = await this.checkDuplicateNote(title);
        if (duplicate) {
            throw new ApiError(
                DUPLICATE_NOTE_TITLE,
                DUPLICATE_NOTE_TITLE,
                DUPLICATE_NOTE_TITLE_METHOD,
                status.BAD_REQUEST,
                true,
            );
        }

        return this.noteRepository.createNewNote(noteBody);
    }

    async updateNote(
        noteId: string,
        updateNoteBody: UpdateNoteBody,
    ): Promise<INote | null> {
        const { user, title, text, completed } = updateNoteBody;

        const existingNote = await this.getNote(noteId);
        if (!existingNote) {
            throw new ApiError(
                NOTE_NOT_FOUND_MESSAGE,
                NOTE_NOT_FOUND_MESSAGE,
                SERVICE_UPDATE_NOTE,
                status.NOT_FOUND,
                true,
            );
        }

        const duplicate = await this.checkDuplicateNote(title);
        if (duplicate && duplicate?._id.toString() !== noteId) {
            throw new ApiError(
                DUPLICATE_NOTE_TITLE,
                DUPLICATE_NOTE_TITLE,
                SERVICE_UPDATE_NOTE,
                status.BAD_REQUEST,
                true,
            );
        }

        return this.noteRepository.updateNote(noteId, {
            user,
            title,
            text,
            completed,
        });
    }

    async deleteNote(noteId: string): Promise<void> {
        const existingNote = await this.getNote(noteId);
        if (!existingNote) {
            throw new ApiError(
                NOTE_NOT_FOUND_MESSAGE,
                NOTE_NOT_FOUND_MESSAGE,
                SERVICE_DELETE_NOTE_METHOD,
                status.NOT_FOUND,
                true,
            );
        }

        await this.noteRepository.deleteNote(noteId);
    }
}

export const noteService = new NoteService(noteRepository, userService);
