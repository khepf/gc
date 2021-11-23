import { AfterViewInit, AfterContentChecked, DoCheck, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseballCard } from 'src/app/models/baseball-card.model';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'year',
    'brand',
    'cardNumber',
    'grade',
    'firstName',
    'lastName',
    'buyPrice',
    'buyDate',
    'sellingPrice',
    'soldPrice',
    'soldDate',
  ];
  // dataSource = new MatTableDataSource<any>();
  dbSub: any;
  baseballCards = new MatTableDataSource();
  private baseballCardSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  isLoading = true;
  user$ = this.auth.user;
  user: any = {};
  currentUser: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('cardFilter') inputName: any;

  constructor(
    private baseballCardService: BaseballCardService,
    private router: Router,
    private uiService: UIService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.currentUser = this.user$.subscribe((res) => {
      this.user = res;
      this.fetchCards(this.user.uid);
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.baseballCardSubscription = this.baseballCardService.baseballCardsChanged.subscribe((cards) => {
      this.baseballCards.data = cards;
    });
  }

  ngAfterViewInit() {
    this.baseballCards.sort = this.sort;
    this.baseballCards.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.baseballCards.filter = filterValue.trim().toLowerCase();
  }

  clearFilterInput() {
    // clearing the value
    this.inputName.nativeElement.value = ' ';
    this.baseballCards.filter = '';
  }

  goToEditCardPage(card: BaseballCard) {
    this.baseballCardService.dataRow = card;
    let url = '/editcard/' + card.id;
    this.router.navigateByUrl(url);
  }

  fetchCards(uid: any) {
    this.baseballCardService.fetchBaseballCards(uid);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.baseballCardSubscription.unsubscribe();
    this.currentUser.unsubscribe();
  }
}
