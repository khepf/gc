import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseballCardService } from 'src/app/services/baseball-card.service';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss'],
})
export class AddCardComponent implements OnInit {
  selectedFile: any = null;
  fb: any;
  downloadURL!: Observable<string>;
  user$ = this.auth.user;
  user: any = {};
  currentUser: any;

  constructor(private baseballCardService: BaseballCardService, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.currentUser = this.user$.subscribe((res) => {
      this.user = res;
    });
  }

  addCard(form: NgForm) {
    this.baseballCardService.addCardToDatabase(this.user.uid, {
      inventoryId: uuidv4(),
      year: form.value.year,
      brand: form.value.brand,
      cardNumber: form.value.cardNumber,
      grade: form.value.grade,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      buyPrice: form.value.buyPrice,
      buyDate: form.value.buyDate,
      sellingPrice: form.value.sellingPrice,
      soldPrice: form.value.soldPrice,
      soldDate: form.value.soldDate,
      notes: form.value.notes,
    });
    form.resetForm();
  }

  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }
}
