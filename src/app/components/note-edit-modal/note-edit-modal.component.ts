import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Note} from "../../models/note.interface";

@Component({
    selector: 'note-edit-modal',
    templateUrl: './note-edit-modal.component.html',
    styleUrls: ['./note-edit-modal.component.css']
})
export class NoteEditModalComponent implements OnInit {

    @Input()
    public note:Note;

    private newText:string;

    constructor(
        public activeModal: NgbActiveModal
    ) {
    }

    public ngOnInit() {
        this.newText = this.note.note;
    }

    public noteChange(event:Event):void {
        let htmlTarget:HTMLInputElement = <HTMLInputElement>event.target;
        this.newText = htmlTarget.value;
    }

    public save():void {
        this.activeModal.close({
            id: this.note.id,
            note : this.newText
        });
    }
}
