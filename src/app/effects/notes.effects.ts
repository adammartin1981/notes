import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {NoteActions} from "../actions/notes.actions";
import {NotesService} from "../services/notes.service";
import {Note} from "../models/note.interface";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/index";
import {AlertActions} from "../actions/alert.actions";

@Injectable()
export class NoteEffects {
    constructor(
        private update$: Actions,
        private noteActions: NoteActions,
        private alertActions: AlertActions,
        private notesService: NotesService,
        private store: Store<AppState>
    ) {}

    /**
     * Handle the ASYNC operations of loading the notes
     *
     * Takes care of the error handling and also dispatching the success
     * actions to continue with the rx/redux approach
     */
    @Effect() loadNotes$ = this.update$
        .ofType(NoteActions.LOAD_NOTES)
        .switchMap(() => this.notesService.getAll())
        .catch((err: string): any => {
            this.store.dispatch(this.alertActions.displayError(err));
            // Continue the stream
            return Observable.of(null);
        })
        .filter((note) => {
            // Omit the errors
            return note !== null;
        })
        .map(
            (notes: Array<Note>) => {
                return this.noteActions.loadNotesSuccess(notes);
            }
        );

    /**
     * Handle the ASYNC operations of editting the notes
     *
     * Takes care of the error handling and also dispatching the success
     * actions to continue with the rx/redux approach
     */
    @Effect() editNote$ = this.update$
        .ofType(NoteActions.EDIT_NOTE)
        .map(action => action.payload)
        .switchMap(note => this.notesService.edit(note)
            .catch((err: string): any => {
                this.store.dispatch(this.alertActions.displayError(err));
                // Continue the stream
                return Observable.of(null);
            }))
        .filter((note) => {
            // Omit the errors
            return note !== null;
        })
        .map((note: Note) => {
            return this.noteActions.editNoteSuccess(note)
        });

    /**
     * Handle the ASYNC operations of adding the notes
     *
     * Takes care of the error handling and also dispatching the success
     * actions to continue with the rx/redux approach
     */
    @Effect() addNote$ = this.update$
        .ofType(NoteActions.ADD_NOTE)
        .map(action => action.payload)
        .switchMap((note: string) => this.notesService.add(note)
            .catch((err: string): any => {
                this.store.dispatch(this.alertActions.displayError(err));
                // Continue the stream
                return Observable.of(null);
            }))
        .filter((note) => {
            // Omit the errors
            return note !== null;
        })
        .map((note: Note) => {
            return this.noteActions.addNoteSuccess(note);
        });

    /**
     * Handle the ASYNC operations of deleting the notes
     *
     * Takes care of the error handling and also dispatching the success
     * actions to continue with the rx/redux approach
     */
    @Effect() deleteNote$ = this.update$
        .ofType(NoteActions.DELETE_NOTE)
        .map(action => action.payload)
        .switchMap((note: Note) => this.notesService.delete(note.id)
            .catch((err: string): any => {
                this.store.dispatch(this.alertActions.displayError(err));
                // Continue the stream
                return Observable.of(null);
            }))
        .filter((note) => {
            // Omit the errors
            return note !== null;
        })
        .map((noteId: number) => {
            return this.noteActions.deleteNoteSuccess(noteId)
        });
}