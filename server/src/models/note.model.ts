import mongoose, { Schema, Model } from 'mongoose';
//!! Спробувати пофіксити
const AutoIncrement = require('mongoose-sequence')(mongoose)
import { INote } from '../interfaces';


const noteSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500,
});


const noteModel: Model<INote> = mongoose.model<INote>('Note', noteSchema);

export {noteModel};