import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class AlertActions {
    static DISPLAY_ERROR    = '[Alerts] Display Error';
    static DISPLAY_WARNING  = '[Alerts] Display Warnings';
    static MARK_ALERT_READ  = '[Alerts] Mark Alert Read';

    /**
     * Takes a string and provides an action that has that string as the payload
     *
     * @param err       The string to display as the error
     * @returns Action
     */
    public displayError(err: string): Action {
        return {
            type: AlertActions.DISPLAY_ERROR,
            payload: err
        }
    }

    /**
     * Takes a string and provides an action that has that string as the payload
     *
     * @param warning       The string to display as the warning
     * @returns Action
     */
    public displayWarning(warning: string): Action {
        return {
            type: AlertActions.DISPLAY_WARNING,
            payload: warning
        }
    }

    /**
     * Takes a string and provides an action that has that string as the payload
     *
     * @param err       The string to display as the error
     * @returns {{type: string, payload: string}}
     */
    public markAlertRead(alert: string): Action {
        return {
            type: AlertActions.MARK_ALERT_READ,
            payload: alert
        }
    }
}