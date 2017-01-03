import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Note} from "../../models/note.interface";
import {NoteEditModalComponent} from "../note-edit-modal/note-edit-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";

@Component({
    selector: 'notes-item',
    templateUrl: './notes-item.component.html',
    styleUrls: ['./notes-item.component.css'],
})
export class NotesItemComponent {

    @Input()
    public note: Note;

    @Output()
    public onDelete: EventEmitter<Note> = new EventEmitter();

    @Output()
    public onEdit: EventEmitter<Note> = new EventEmitter();

    constructor(
        private modalService: NgbModal
    ) {
    }


    public deleteNote():void {
        const modalRef = this.modalService.open(ConfirmModalComponent);
        let shortNote:string = this.note.note.substr(0, 20) + '...';

        Object.assign(modalRef.componentInstance, {
            title: 'Are you sure you want to delete?',
            message: `Delete Note: <strong>`+shortNote+`</strong>?`
        });

        modalRef.result.then(
            () => {
                this.onDelete.emit(this.note);
            },
            () => {
                // Called when the modal is dismissed
            }
        );


    }

    public editNote():void {
        const modalRef = this.modalService.open(NoteEditModalComponent);
        modalRef.componentInstance.note = {
            note : this.note.note,
            id : this.note.id
        };

        modalRef.result.then(
            (success: Note) => {
                this.onEdit.emit(success);
            },
            () => {
                // Called when the modal is dismissed
            }
        );
    }
}
