import {Action} from "@ngrx/store";
import {Note} from "./note.interface";

export interface SingleNoteAction extends Action {
    type:string;
    payload:Note;
}

export interface ArrayNotesAction extends Action {
    type:string;
    payload:Array<Note>;
}