import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {NoteActions} from "../../actions/notes.actions";
import {AppState} from "../../reducers/index";
import {NoteAddModalComponent} from "../note-add-modal/note-add-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertActions} from "../../actions/alert.actions";

@Component({
    selector: 'note-adder',
    templateUrl: './note-adder.component.html',
    styleUrls: ['./note-adder.component.css']
})
export class NoteAdderComponent {

    constructor(
        private noteActions:NoteActions,
        private alertActions:AlertActions,
        private store:Store<AppState>,
        private modalService: NgbModal
    ) {
    }

    public addNewNote():void {
        const modalRef = this.modalService.open(NoteAddModalComponent);

        modalRef.result.then(
            (newNote: string) => {
                if (newNote === '' ) {
                    this.store.dispatch(this.alertActions.displayWarning('Unable to create empty note'));
                    return;
                }
                this.addNote(newNote);
            },
            () => {
                // Called when the modal is dismissed
            }
        );
    }


    /**
     * Calls the actual store and passes the note we wish to add
     *
     * @param newNote   The new note string we wish to add
     */
    private addNote(newNote:string): void {
        this.store.dispatch(this.noteActions.addNote(newNote));
    }
}
