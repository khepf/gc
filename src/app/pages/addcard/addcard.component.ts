import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BaseballCardService } from 'src/app/services/baseball-card.service';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss'],
})
export class AddCardComponent {
  selectedFile: any = null;
  fb: any;
  downloadURL!: Observable<string>;

  constructor(
    private baseballCardService: BaseballCardService,
    private storage: AngularFireStorage
  ) {}

  addCard(form: NgForm) {
    this.baseballCardService.addCardToDatabase({
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
    });
  }
}
