import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user$!: Observable<any>;
    userDetails: any;
    userName = new BehaviorSubject<string>('');

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.user$ = this.afAuth.authState;
        this.user$.subscribe(res => {
            if (res) {
                this.userDetails = res;
                this.userName.next(this.userDetails.displayName)
            }
        })
    }
    getCurrentUser() {
        this.afAuth.authState.subscribe(res => {
            if (res) {
                this.userDetails = res;
                this.userName.next(this.userDetails.displayName);
                this.router.navigate(['/home']);
            }
        })
    }

    getUserName() {
        return this.userName.asObservable();
    }

    getUserFullDetails() {
        return this.user$
    }

    signOut() {
        this.afAuth.signOut();
        this.userName.next('')
        this.userDetails = null;
        sessionStorage.clear();
    }
}