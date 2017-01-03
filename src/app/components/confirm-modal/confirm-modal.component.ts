import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

    @Input()
    public title:string;

    @Input()
    public message:string;

    constructor(
        public activeModal: NgbActiveModal
    ) {
    }
}
