import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'note-add-modal',
    templateUrl: './note-add-modal.component.html',
    styleUrls: ['./note-add-modal.component.css']
})
export class NoteAddModalComponent {

    public newNoteText: string = '';

    constructor(
        public activeModal: NgbActiveModal
    ) {
    }

    /**
     * Used for change detection and updating the local store of the string
     *
     * @param event     The event passed through from the textarea element
     */
    public noteChange(event: Event): void {
        let htmlTarget: HTMLTextAreaElement = <HTMLTextAreaElement>event.target;
        this.newNoteText = htmlTarget.value;
    }

    /**
     * When the modal is closed - it dispatches the newly entered text
     */
    public save():void {
        this.activeModal.close(this.newNoteText);
    }

    /**
     * Used for the save button to ensure we can't add an empty note
     *
     * @returns {boolean}
     */
    private canSave():boolean {
        return true;
        // Un-comment below if you wish to prevent the warning and just disable the save button
        // if (this.newNoteText.length > 0) {
        //     return true;
        // }
        // return false;
    }

}
