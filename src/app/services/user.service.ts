import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userDetails: any;
    userName = new BehaviorSubject<string>('');

    constructor(
        private afAuth: AngularFireAuth
    ) { }
    getCurrentUser() {
        this.afAuth.authState.subscribe(res => {
            if (res) {
                this.userDetails = res;
                this.userName.next(this.userDetails.displayName);
            }
        })
    }

    getUserName() {
        return this.userName.asObservable();
    }

    signOut() {
        this.afAuth.signOut();
        this.userName.next('')
        this.userDetails = null;
    }
}