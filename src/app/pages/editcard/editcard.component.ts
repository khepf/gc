import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.scss'],
})
export class EditCardComponent implements OnInit {
  baseballCard: any = {};
  baseballCardRef: any = {};
  user$ = this.auth.user;
  user: any = {};
  currentUser: any;

  constructor(
    private baseballCardService: BaseballCardService,
    public dialog: MatDialog,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.baseballCard = this.baseballCardService.fetchBaseballCard();
    this.currentUser = this.user$.subscribe((res) => {
      this.user = res;
    });
  }

  openDialog() {
    this.dialog.open(DeleteModalComponent, {
      data: {
        id: this.baseballCard.id,
        year: this.baseballCard.year,
        firstName: this.baseballCard.firstName,
        lastName: this.baseballCard.lastName,
      },
    });
  }

  updateCard() {
    let data = { ...this.baseballCard };
    this.baseballCardService.updateCardInDatabase(this.user.uid, data);
  }

  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }
}

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.modal.component.html',
})
export class DeleteModalComponent implements OnInit {
  user$ = this.auth.user;
  user: any = {};
  currentUser: any;
  constructor(
    private baseballCardService: BaseballCardService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private auth: AngularFireAuth,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; year: string; firstName: string; lastName: string }
  ) {}

  ngOnInit() {
    this.currentUser = this.user$.subscribe((res) => {
      this.user = res;
    });
  }

  deleteCard() {
    this.baseballCardService.deleteCard(this.user.uid, this.data.id);
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }
}
