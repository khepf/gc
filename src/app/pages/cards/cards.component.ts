import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseballCard } from 'src/app/models/baseball-card.model';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';



@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['year', 'brand', 'cardNumber', 'grade', 'firstName', 'lastName', 'buyPrice', 'buyDate', 'sellingPrice', 'soldPrice', 'soldDate'];
  // dataSource = new MatTableDataSource<any>();
  dbSub: any;
  baseballCards = new MatTableDataSource();
  private baseballCardSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  isLoading = true;
  



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private baseballCardService: BaseballCardService, private router: Router, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.baseballCardSubscription = this.baseballCardService.baseballCardsChanged.subscribe(cards => {
      this.baseballCards.data = cards;
    })
    this.fetchCards();
  }

  ngAfterViewInit() {
    this.baseballCards.sort = this.sort;
    this.baseballCards.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.baseballCards.filter = filterValue.trim().toLowerCase();
  }

  goToEditCardPage(card: BaseballCard) {
    this.baseballCardService.dataRow = card;
    let url = "/editcard/" + card.id
    this.router.navigateByUrl(url);
  }

  fetchCards() {
    this.baseballCardService.fetchBaseballCards();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.baseballCardSubscription.unsubscribe();
  }

}
