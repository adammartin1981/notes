import {Action} from "@ngrx/store";
import {NoteActions} from "../actions/notes.actions";
import {Note} from "../models/note.interface";

export type NoteState = Array<Note>;

const initialState: NoteState = [];

export default (state: NoteState = initialState, action: Action): NoteState => {

    switch (action.type) {
        case NoteActions.ADD_NOTE_SUCCESS:
            return [...state, action.payload];

        case NoteActions.EDIT_NOTE_SUCCESS:
            return [...state].map((note) => {
                if (note.id === action.payload.id) {
                    return {
                        id : note.id,
                        note : action.payload.note
                    }
                }

                return note;
            });


        case NoteActions.LOAD_NOTES_SUCCESS:
            // Over-ride all the existing notes
            return [...action.payload];

        case NoteActions.DELETE_NOTE_SUCCESS:
            // Remove the deleted ID
            return state.filter(note => {
                return note.id !== action.payload;
            });

        default:
            return state;
    }
};