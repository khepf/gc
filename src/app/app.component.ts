import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-card-inventory';
  isAuth = false;
  authSubscription!: Subscription;

  @ViewChild('snav', { static: false }) sideMenu!: MatSidenav;
 

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
    });
    
  }



  onLogout() {
    this.authService.logout();
this.sideMenu.close();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }


}
