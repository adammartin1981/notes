import {NoteState} from "./notes.reducer";
import notes from './notes.reducer';
import alerts from './alert.reducer';
import {compose} from "@ngrx/core";
import {storeLogger} from "ngrx-store-logger";
import {combineReducers} from "@ngrx/store";
import {AlertState} from "./alert.reducer";

export interface AppState {
    notes: NoteState;
    alerts:AlertState;
}

export default compose(storeLogger(), combineReducers)({
    notes,
    alerts
});
