import { INote, INoteRepository } from '../interfaces';
import { noteModel } from '../models';
import { CreateNoteBody, UpdateNoteBody } from '../types';

export class NoteRepository implements INoteRepository {
    async getAll(): Promise<INote[] | null> {
        return noteModel.find().exec();
    }
    //!! Перевірити коректність роботи
    async getAllUserNotes(userId: string): Promise<INote[] | null> {
        return noteModel.find({ user: userId }).exec();
    }

    async getNoteById(noteId: string): Promise<INote | null> {
        return noteModel.findById({ id: noteId }).exec();
    }

    async createNewNote(noteBody: CreateNoteBody): Promise<INote | null> {
        return noteModel.create(noteBody);
    }

    async checkDuplicateNote(title: string): Promise<INote | null> {
        return noteModel.findOne({ title }).exec();
    }

    async updateNote(
        noteId: string,
        updateNoteBody: UpdateNoteBody,
    ): Promise<INote | null> {
        const updateNote = await noteModel
            .findByIdAndUpdate({ _id: noteId }, updateNoteBody, {
                new: true,
                lean: true,
            })
            .exec();
        return updateNote as INote | null;
    }

    async deleteNote(noteId: string): Promise<void> {
        await noteModel.findByIdAndDelete({ _id: noteId }).exec();
    }
}

export const noteRepository = new NoteRepository();
