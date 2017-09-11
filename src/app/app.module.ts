import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';

import {AppComponent} from './app.component';

import {EmailComponent} from './email/email.component';
import {SignupComponent} from './signup/signup.component';
import {MembersComponent} from './members/members.component';
import {AuthGuard} from './auth.service';
import {routes} from './app.routes';
import {LoginComponent} from './login/login.component';
import {NotesComponent} from './notes/notes.component';

// Must exporAt the config
export const firebaseConfig = {
    apiKey: 'AIzaSyCgH6Cq5vketCNarnnTJ12yTB1_oOj_RaE',
    authDomain: 'max-iron-workout-planner.firebaseapp.com',
    databaseURL: 'https://max-iron-workout-planner.firebaseio.com',
    projectId: 'max-iron-workout-planner',
    storageBucket: 'max-iron-workout-planner.appspot.com',
    messagingSenderId: '702190917919'
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        EmailComponent,
        SignupComponent,
        MembersComponent,
        LoginComponent,
        NotesComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        routes
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
