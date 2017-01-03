import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {NoteActions} from "./actions/notes.actions";
import {AppState} from "./reducers/index";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public title: string;

    constructor(
        private store:Store<AppState>,
        private noteActions:NoteActions,
    ) {
    }

    public ngOnInit():void {
        this.title = 'Notes Editor';
        this.store.dispatch(this.noteActions.loadNotes());
    }
}
