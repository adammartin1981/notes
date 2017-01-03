import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Note} from "../models/note.interface";


@Injectable()
export class NotesService {

    private baseUrl:string;
    private options:RequestOptions;

    constructor(
        private http:Http
    ) {
        this.options = this.getOptions();
        this.baseUrl = 'http://localhost:3333/api/notes';
    }

    /**
     * Gets all the notes from the server
     *
     * @returns {Observable<Array<Note>>}
     */
    public getAll():Observable<Array<Note>> {
        const errorMsg:string = 'Unable to get notes from the server. Please try again later.';
        return this.http.get(this.baseUrl)
                        .catch(() => Observable.throw(errorMsg))
                        .map(res => res.json());
    }

    /**
     * Add/Create a single Note.
     *
     * Pass through a string and it will return a note
     *
     * @param note                  The string of the note
     * @returns {Observable<Note>}  The newly created note
     */
    public add(note:string):Observable<Note> {
        const errorMsg:string       = 'Unable to add your note. Please try again later.';
        const emptyErrorMsg:string  = 'Unable to add empty note';

        if (!note) {
            return Observable.throw(emptyErrorMsg);
        }

        return this.http.post(this.baseUrl, JSON.stringify({ note : note }), this.options)
                        .catch(() => Observable.throw(errorMsg))
                        .map(res => res.json());
    }

    /**
     * Edit the note, pass through the new note to submit.
     *
     * The id of the note is the one being editted.
     *
     * @param newNote               The new note to be submitted to the server
     * @returns {Observable<Note>}  The new updated note complete with ID
     */
    public edit(newNote:Note):Observable<Note> {
        const errorMsg:string = 'Unable to edit your note. Please try again later.';

        return this.http.put(this.baseUrl + '/' + newNote.id, JSON.stringify({note:newNote.note}), this.options)
                        .catch(() => Observable.throw(errorMsg))
                        .map(res => res.json());
    }

    /**
     * Delete the note - pass through the note ID
     *
     * @param noteId                               The number of the note ID
     * @returns {Observable<string|number>}        The ID/Error of the note
     */
    public delete(noteId:number):Observable<string|number> {
        const errorMsg:string       = 'Unable to delete your note. Please try again later.';
        const noNoteMessage:string  = 'Unable to delete unspecified note';

        if (!noteId) {
            return Observable.throw(noNoteMessage);
        }

        return this.http.delete(this.baseUrl + '/'+ noteId, this.options)
                        .catch(() => Observable.throw(errorMsg))
                        .map(() => noteId);
    }

    /**
     * Helper method to create a set of Request Options used for the
     * HTTP requests
     *
     * @returns {RequestOptions}
     */
    private getOptions():RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return options;
    }
}