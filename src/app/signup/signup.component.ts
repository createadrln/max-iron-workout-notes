import {Component, Input, OnInit} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';

import {moveIn, fallIn} from '../router.animations';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    animations: [moveIn(), fallIn()],
})

export class SignupComponent implements OnInit {

    error: any;
    name: any;

    @Input() email;
    @Input() password;

    constructor(public af: AngularFire, private router: Router) {}

    onSubmit(formData) {
        if (formData.valid) {
            this.af.auth.createUser(
                {
                    email: formData.value.email,
                    password: formData.value.password
                }
            ).then(
                (success) => {
                    this.af.auth.subscribe(auth => {
                        if (auth) {
                            this.name = auth;
                            this.postSignIn(auth);
                        }
                    });
                    this.router.navigate(['/member']);
                }
            ).catch(
                (err) => {
                    this.error = err;
                }
            );
        }
    }

    private postSignIn(auth): void {
        /* Todo check to see if the account is already in the system */

        this.addNewUserAccount(auth);
        /* Todo send an email validation message */
        /* Todo if not make a new user node */
        /* Todo move this to the different login (email, facebook, google) functions? */
    }

    private addNewUserAccount(auth): void {
        /* Todo change programs to use service */
        this.af.database.object('/members/' + auth.uid).set({
            'email': this.name.auth.email,
            'displayName': this.name.auth.displayName,
        });
    }

    ngOnInit(): void {
    }
}
