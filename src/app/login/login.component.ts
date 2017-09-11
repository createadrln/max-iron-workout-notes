import {Component, OnInit, HostBinding} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    error: any;
    name: any;

    constructor(public af: AngularFire, private router: Router) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.router.navigate(['/member']);
            }
        });
    }

    loginFb() {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
        }).then(
            (success) => {
                this.router.navigate(['/member']);
            }).catch(
            (err) => {
                this.error = err;
            });
    }

    loginGoogle() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        }).then(
            (success) => {
                this.router.navigate(['/member']);
            }).catch(
            (err) => {
                this.error = err;
            });
    }

    ngOnInit() {
    }

}
