import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BaseballCard } from '../models/baseball-card.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UIService } from './ui.service';
import { doc, deleteDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class BaseballCardService {
  private baseballCards: BaseballCard[] = [];
  dataSource = new MatTableDataSource<any>();
  baseballCardsChanged = new Subject<BaseballCard[]>();
  dataRow: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private router: Router, private uiService: UIService) {}

  fetchBaseballCards(uid: any) {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection(uid, (ref) => ref.orderBy('year'))
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc: any) => {
              return {
                id: doc.payload.doc.id,
                brand: doc.payload.doc.data().brand,
                buyDate: doc.payload.doc.data().buyDate,
                buyPrice: doc.payload.doc.data().buyPrice,
                cardNumber: doc.payload.doc.data().cardNumber,
                firstName: doc.payload.doc.data().firstName,
                grade: doc.payload.doc.data().grade,
                inventoryId: doc.payload.doc.data().inventoryId,
                lastName: doc.payload.doc.data().lastName,
                sellingPrice: doc.payload.doc.data().sellingPrice,
                soldDate: doc.payload.doc.data().soldDate,
                soldPrice: doc.payload.doc.data().soldPrice,
                year: doc.payload.doc.data().year,
                notes: doc.payload.doc.data().notes,
              };
            });
          })
        )
        .subscribe(
          (cards: any) => {
            this.uiService.loadingStateChanged.next(false);
            this.baseballCards = cards;
            this.baseballCardsChanged.next([...this.baseballCards]);
          },
          (err) => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('Fetching Cards failed, please try again later', undefined, 3000);
            this.baseballCardsChanged.next(undefined);
          }
        )
    );
  }

  fetchBaseballCard() {
    return this.dataRow;
  }

  addCardToDatabase(uid: any, baseballCard: BaseballCard) {
    this.db
      .collection(uid)
      .add(baseballCard)
      .then((res) => {
        this.uiService.showSnackbar('Baseball Card added successfully', undefined, 3000);
      })
      .then((res) => {
        this.router.navigate(['/cards']);
      })
      .catch((err) => {
        console.log(err);
        this.uiService.showSnackbar('Failed to add baseball card, please try again later', undefined, 3000);
      });
  }

  updateCardInDatabase(uid: any, card: any) {
    return this.db
      .collection(uid)
      .doc(card.id)
      .update(card)
      .then((res) => {
        this.uiService.showSnackbar('Baseball Card updated successfully', undefined, 3000);
      })
      .then((res) => {
        this.router.navigate(['/cards']);
      })
      .catch((err) => {
        this.uiService.showSnackbar('Failed to update baseball card, please try again later', undefined, 3000);
      });
  }

  deleteCard(uid: any, id: string) {
    return this.db
      .collection(uid)
      .doc(id)
      .delete()

      .then((res) => {
        this.uiService.showSnackbar('Baseball Card deleted successfully', undefined, 3000);
      })
      .then((res) => {
        this.router.navigate(['/cards']);
      })
      .catch((err) => {
        console.log(err);
        this.uiService.showSnackbar('Failed to delete baseball card, please try again later', undefined, 3000);
      });
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
