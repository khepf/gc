import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { BaseballCard } from 'src/app/models/baseball-card.model';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  user$ = this.auth.user;
  user: any = {};
  currentUser: any;
  Bowman1955Cards$!: Observable<BaseballCard[]>;

  constructor(private baseballCardService: BaseballCardService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.currentUser = this.user$.subscribe((res) => {
      this.user = res;
      this.reloadCards(this.user.uid);
    });
  }

  reloadCards(uid: any) {
    this.Bowman1955Cards$ = this.baseballCardService.fetchCardsByYear(uid, '1955');
    console.log('1955 cards', this.Bowman1955Cards$);
  }
}
