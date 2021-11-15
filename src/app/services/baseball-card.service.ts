import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BaseballCard } from "../models/baseball-card.model";
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from "rxjs";
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { UIService } from "./ui.service";
import { doc, deleteDoc } from "firebase/firestore";

@Injectable()
export class BaseballCardService {
   private baseballCards: BaseballCard[] = [];
   dataSource = new MatTableDataSource<any>();
   baseballCardsChanged = new Subject<BaseballCard[]>();
   dataRow: any;
   private fbSubs: Subscription[] = [];

   constructor(private db: AngularFirestore, private router: Router, private uiService: UIService) {

   }
   
   fetchBaseballCards() {
      this.uiService.loadingStateChanged.next(true);
      this.fbSubs.push(this.db.collection('baseballCards')
      .snapshotChanges()
      .pipe(map(docArray => {
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
            }
         })
      }))
      .subscribe((cards: any) =>{
         this.uiService.loadingStateChanged.next(false);
         this.baseballCards = cards;
         this.baseballCardsChanged.next([...this.baseballCards]);
      }, err => {
         this.uiService.loadingStateChanged.next(false);
         this.uiService.showSnackbar('Fetching Cards failed, please try again later', undefined, 3000);
         this.baseballCardsChanged.next(undefined);
      }));
   }

   fetchBaseballCard() {
    
      return this.dataRow; 
   }

   addCardToDatabase(baseballCard: BaseballCard) {
      this.db.collection('baseballCards')
      .add(baseballCard)
      .then(res => {
         /// this.router.navigate(['/cards']);
         this.uiService.showSnackbar('Baseball Card added successfully', undefined, 3000);
      }).then(res => {
         this.router.navigate(['/cards']);
      }).catch(err => {
         console.log(err);
         this.uiService.showSnackbar('Failed to add baseball card, please try again later', undefined, 3000);
      });
   }

   // this is where you left off. havent implemented to componet yet
   updateCardInDatabase(card: any) {
      return this.db.collection('baseballCards').doc(card.id).update(card)
      .then(res => {
         this.uiService.showSnackbar('Baseball Card updated successfully', undefined, 3000);
      }).then(res => {
         this.router.navigate(['/cards']);
      }).catch(err => {
         console.log('4', err);
         this.uiService.showSnackbar('Failed to update baseball card, please try again later', undefined, 3000);
      });
  }

  deleteCard(id: string) {
    
      return this.db.collection('baseballCards').doc(id).delete()
     
    
      .then(res => {
         console.log('1', id);
         this.uiService.showSnackbar('Baseball Card deleted successfully', undefined, 3000);
      }).then(res => {
         console.log('2', id);
         this.router.navigate(['/cards']);
      }).catch(err => {
         console.log('3');
         console.log(err);
         this.uiService.showSnackbar('Failed to delete baseball card, please try again later', undefined, 3000);
      });
  }

  cancelSubscriptions() {
     this.fbSubs.forEach(sub => sub.unsubscribe());
  }


}