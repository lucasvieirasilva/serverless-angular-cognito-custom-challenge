import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { tap, catchError, flatMap, map } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable()
export class CognitoAuthService {

    public loggedIn: BehaviorSubject<boolean>;
    public userInfo: any;

    constructor(
        private router: Router
    ) {
        Amplify.configure(environment.amplify);
        this.loggedIn = new BehaviorSubject<boolean>(false);
    }

    /** signup */
    public signUp(email, password): Observable<any> {
        return from(Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email
            }
        }));
    }

    /** confirm code */
    public confirmSignUp(email, code): Observable<any> {
        return from(Auth.confirmSignUp(email, code));
    }

    /** signin */
    public signIn(email, password): Observable<any> {
        return from(Auth.signIn(email, password))
            .pipe(
                flatMap(async (user: CognitoUser) => {
                    return await new Promise((resolve, reject) => {
                        user.sendCustomChallengeAnswer('test', {
                            onSuccess: (session) => {
                                this.loggedIn.next(true);
                                resolve(session);
                            },
                            onFailure: (err) => {
                                console.log(err);
                                reject(err);
                            }
                        });
                    });
                })
            );
    }

    /** get authenticat state */
    public isAuthenticated(): Observable<boolean> {
        return from(Auth.currentAuthenticatedUser())
            .pipe(
                map((result) => {
                    this.userInfo = result;

                    this.loggedIn.next(true);
                    return true;
                }),
                catchError(error => {
                    console.error(error);
                    this.loggedIn.next(false);
                    this.userInfo = null;
                    return of(false);
                }));
    }

    /** signout */
    public signOut() {
        from(Auth.signOut())
            .subscribe(
                () => {
                    this.loggedIn.next(false);
                    this.userInfo = null;
                    this.router.navigate(['/login']);
                },
                error => console.error(error)
            );
    }
}
