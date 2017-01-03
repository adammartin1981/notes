import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {NotesListComponent} from './components/notes-list/notes-list.component';
import {NotesService} from "./services/notes.service";
import {NotesItemComponent} from './components/notes-item/notes-item.component';
import {NoteAdderComponent} from './components/note-adder/note-adder.component';
import {NgbModule, NgbModalModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NoteEditModalComponent} from './components/note-edit-modal/note-edit-modal.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {NoteEffects} from "./effects/notes.effects";
import reducer from './reducers';
import {NoteActions} from "./actions/notes.actions";
import { NoteAddModalComponent } from './components/note-add-modal/note-add-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {AlertActions} from "./actions/alert.actions";
import { AlertsComponent } from './components/alerts/alerts.component';


@NgModule({
    declarations: [
        AppComponent,
        NotesListComponent,
        NotesItemComponent,
        NoteAdderComponent,
        NoteEditModalComponent,
        NoteAddModalComponent,
        ConfirmModalComponent,
        AlertsComponent
    ],
    imports: [
        NgbModule.forRoot(),
        NgbAlertModule,
        NgbModalModule,

        BrowserModule,
        FormsModule,
        HttpModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(NoteEffects)
    ],
    providers: [
        NotesService,
        NoteEffects,
        NoteActions,
        AlertActions
    ],
    entryComponents: [
        NoteEditModalComponent,
        NoteAddModalComponent,
        ConfirmModalComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
