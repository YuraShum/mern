import { Response } from 'express';

import { IErrorResponse, INote } from '../interfaces';

export type GetAllNoteResponse = Response<INote[] | IErrorResponse>;

export type NoteResponse = Response<INote | IErrorResponse>;

export type DeleteNoteResponse = Response<void | IErrorResponse>;

export type CreateNoteBody = Pick<INote, 'title' | 'text' | 'user'>;

export type UpdateNoteBody = {
    user: string;
    title: string;
    text: string;
    completed: boolean;
};
