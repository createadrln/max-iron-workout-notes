import {Component, OnInit, Input} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    user: FirebaseObjectObservable<any[]>;
    notes: FirebaseListObservable<any[]>;
    dbExerciseCols: FirebaseListObservable<any[]>;

    rowCols = [];
    editRowValues = null;
    // addChildRowValues = null;

    constructor(public af: AngularFire) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.user = this.af.database.object('/members/' + auth.uid);
                this.notes = this.af.database.list('/members/' + auth.uid + '/notes');
            }
        });
    }

    ngOnInit() {
    }

    /*
    Editing a row
     */
    editRow(noteKey, index) {
        this.editRowValues = index;
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.dbExerciseCols = this.af.database
                    .list('/members/' + auth.uid + '/notes/' + noteKey + '/exercises/' + index + '/cols/');
                this.dbExerciseCols.subscribe(cols => {
                    this.rowCols = cols;
                });
            }
        });
    }

    /*
    Saving a row
     */
    saveRow(noteKey, index) {
        const rowColArray = [];

        this.rowCols.forEach(function(childRowCol) {
            rowColArray[childRowCol.$key] = childRowCol.$value;
        });

        this.af.auth.subscribe(auth => {
            if (auth) {
                this.af.database.object('/members/' + auth.uid + '/notes/' + noteKey + /exercises/ + index + '/cols/').set(rowColArray);
            }
        });

        this.editRowValues = null;
    }

    /*
    Add child row
     */
    // addChildRow(index) {
    //     this.addChildRowValues = index;
    // }

    /*
    Delete a row
     */
    deleteRow(notesKey, index) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                // this.af.database.object('/members/' + auth.uid + '/notes/' + notesKey + /exercises/ + index).remove();
            }
        });
    }

    /*
    Save New Note Row
     */
    createNewRow(notesKey, rowsCount, rowTitle) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.af.database.object('/members/' + auth.uid + '/notes/' + notesKey + /exercises/ + rowsCount).set({
                    'title': rowTitle,
                    'cols': this.rowCols
                });
            }
        });
    }
}
