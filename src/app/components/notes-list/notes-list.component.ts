import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {Observable} from "rxjs";
import {Note} from "../../models/note.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/index";
import {NoteActions} from "../../actions/notes.actions";

@Component({
    selector: 'notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

    public notesList: Observable<Array<Note>>;

    constructor(
        private notes: NotesService,
        private store: Store<AppState>,
        private noteActions: NoteActions
    ) {
    }

    public ngOnInit() {
        this.notesList = this.store.select('notes');
    }

    public editNote(note: Note):void {
        this.store.dispatch(this.noteActions.editNote(note));
    }

    public deleteNote(note: Note): void {
        this.store.dispatch(this.noteActions.deleteNote(note));
    }
}
