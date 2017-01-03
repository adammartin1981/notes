import {Action} from "@ngrx/store";
import {AlertActions} from "../actions/alert.actions";
import {AlertItem} from "../models/alerts.interface";

export type AlertState = Array<AlertItem>;

const initialState: AlertState = [];

export default (state: AlertState = initialState, action: Action): AlertState => {

    function generateId():string {
        return new Date().toISOString() + "=" + Math.floor(Math.random() * 1000);
    }

    switch (action.type) {
        case AlertActions.DISPLAY_ERROR:
            return [...state, {
                isRead:false,
                type : 'danger',
                id : generateId(),
                message :action.payload
            }];


        case AlertActions.DISPLAY_WARNING:
            return [...state, {
                isRead:false,
                type : 'warning',
                id : generateId(),
                message :action.payload
            }];

        case AlertActions.MARK_ALERT_READ:
            return [...state].map((alert:AlertItem) => {
                if (alert.id === action.payload.id) {
                    return Object.assign(action.payload, {
                        isRead : true
                    });
                }
                return alert;
            })

        default:
            return state;
    }
};