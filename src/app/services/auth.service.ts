import { AuthData } from "../models/auth-data.model";
import { User } from "../models/user.model";

import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BaseballCardService } from "./baseball-card.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "./ui.service";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, 
        private afAuth: AngularFireAuth, 
        private baseballCardService: BaseballCardService,
        private uiService: UIService) {

    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/cards']);
            } else {
                this.baseballCardService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(res => {
            
       this.uiService.loadingStateChanged.next(false);
        })
        .catch(err => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(err.message, undefined, 3000);
        });

        

    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
            this.uiService.loadingStateChanged.next(false);
        }).catch(err => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(err.message, undefined, 3000);
        })
        

    }

    logout() {
        this.afAuth.signOut();
       
    }

    isAuth() {
        return this.isAuthenticated;
    }
}