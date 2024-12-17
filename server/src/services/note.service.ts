import { INote, INoteService } from '../interfaces';
import { noteRepository, NoteRepository } from '../repository';
import { CreateNoteBody, UpdateNoteBody } from '../types';
import { userService, UserService } from './user.service';

//!! Додати логіку опрацювання помилок там де потрібно
export class NoteService implements INoteService {
    constructor(
        private noteRepository: NoteRepository,
        private userService: UserService,
    ) {}

    //!! Виправити в подальшому використання undefined
    async getAllNotes(): Promise<
        (INote & { username: string | undefined })[] | null
    > { // eslint-disable-line
        const notes = await this.noteRepository.getAll();

        if (notes?.length) {
            const notesWithUser = await Promise.all(
                notes.map(async note => {
                    const user = await this.userService.getUser(note.user);
                    //!! коли зроблю централізований обробник ватро додати обробку помилок
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
        return this.noteRepository.getNoteById(noteId);
    }

    async checkDuplicateNote(title: string): Promise<INote | null> {
        return this.noteRepository.checkDuplicateNote(title);
    }

    async createNote(noteBody: CreateNoteBody): Promise<INote | null> {
        return this.noteRepository.createNewNote(noteBody);
    }

    async updateNote(
        noteId: string,
        updateNoteBody: UpdateNoteBody,
    ): Promise<INote | null> {
        return this.noteRepository.updateNote(noteId, updateNoteBody);
    }

    async deleteNote(noteId: string): Promise<void> {
        return this.noteRepository.deleteNote(noteId);
    }
}

export const noteService = new NoteService(noteRepository, userService);
