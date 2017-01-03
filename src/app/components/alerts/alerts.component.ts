import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/index";
import {AlertActions} from "../../actions/alert.actions";
import {AlertItem} from "../../models/alerts.interface";

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

    public alerts: Observable<Array<AlertItem>>;

    constructor(
        private store: Store<AppState>,
        private alertActions:AlertActions
    ) {
    }

    public ngOnInit() {
        // Get the slice of store we're interested in
        this.alerts = this.store.select('alerts')
            .map((ar:Array<AlertItem>) => ar.filter((alert:AlertItem) => !alert.isRead));
    }


    /**
     * Used by the alert messages
     *
     * Takes the alert in question and then dispatches an action to remove the read state
     *
     * @param alert
     */
    public closeAlert(alert:any):void {
        this.store.dispatch(this.alertActions.markAlertRead(alert));
    }

}
