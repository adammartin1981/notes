import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Note} from "../models/note.interface";
import {ArrayNotesAction, SingleNoteAction} from "../models/actions.interface";

@Injectable()
export class NoteActions {
    static LOAD_NOTES           = '[Notes] Load Notes';
    static LOAD_NOTES_SUCCESS   = '[Notes] Load Notes Success';
    static EDIT_NOTE            = '[Notes] Edit Note';
    static EDIT_NOTE_SUCCESS    = '[Notes] Edit Note Success';
    static ADD_NOTE             = '[Notes] Add Note';
    static ADD_NOTE_SUCCESS     = '[Notes] Add Note Success';
    static DELETE_NOTE          = '[Notes] Delete Note';
    static DELETE_NOTE_SUCCESS  = '[Notes] Delete Note Success';

    /**
     * Instigates the loading of the notes
     *
     * Used by the notes.effects
     *
     * @returns Action
     */
    public loadNotes(): Action {
        return {
            type: NoteActions.LOAD_NOTES
        };
    }

    /**
     * The callback from the async loading
     *
     * Used by the reducer
     *
     * @param notes
     * @returns ArrayNotesAction
     */
    public loadNotesSuccess(notes: Array<Note>): ArrayNotesAction {
        return {
            type: NoteActions.LOAD_NOTES_SUCCESS,
            payload: notes
        };
    }


    /**
     * Instigates the editing of a single note
     *
     * Used by the notes.effects
     *
     * @param note                  The note to be submitted via async
     * @returns SingleNoteAction    The action to be dispatched on the store
     */
    public editNote(note: Note): SingleNoteAction {
        return {
            type: NoteActions.EDIT_NOTE,
            payload: note
        };
    }

    /**
     * The callback from the async editing
     *
     * Used by the reducer
     *
     * @param note                  The newly editted note
     * @returns SingleNoteAction    The action to be dispatched on the store
     */
    public editNoteSuccess(note: Note): SingleNoteAction {
        return {
            type: NoteActions.EDIT_NOTE_SUCCESS,
            payload: note
        };
    }

    /**
     * Instigates the adding of a single note
     *
     * Used by the notes.effects
     *
     * @param note                  The text of the note to be added via async
     * @returns Action              The action to be dispatched on the store
     */
    public addNote(note: string): Action {
        return {
            type: NoteActions.ADD_NOTE,
            payload: note
        };
    }

    /**
     * The callback from the async adding
     *
     * Used by the reducer
     *
     * @param note                  The newly added note
     * @returns SingleNoteAction    The action to be dispatched on the store
     */
    public addNoteSuccess(note: Note): SingleNoteAction {
        return {
            type: NoteActions.ADD_NOTE_SUCCESS,
            payload: note
        };
    }

    /**
     * Instigates the deleting of a single note
     *
     * Used by the notes.effects
     *
     * @param note                  The note to delete
     * @returns SingleNoteAction    The action to be dispatched on the store
     */
    public deleteNote(note: Note): SingleNoteAction {
        return {
            type: NoteActions.DELETE_NOTE,
            payload: note
        };
    }

    /**
     * The callback from the async deleting
     *
     * Used by the reducer
     *
     * @param noteId                The id of the note to remove from the store
     * @returns Action              The action to be dispatched on the store
     */
    public deleteNoteSuccess(noteId: number): Action {
        return {
            type: NoteActions.DELETE_NOTE_SUCCESS,
            payload: noteId
        };
    }
}