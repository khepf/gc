import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
    selector: 'app-editcard',
    templateUrl: './editcard.component.html',
    styleUrls: ['./editcard.component.scss']
  })
  export class EditCardComponent implements OnInit{
    baseballCard: any = {};
    baseballCardRef: any = {};

    constructor(private baseballCardService: BaseballCardService, 
      private route: ActivatedRoute,
      public dialog: MatDialog) { }

    ngOnInit() {
      
      this.baseballCard = this.baseballCardService.fetchBaseballCard();
    }

    openDialog() {
      this.dialog.open(DeleteModalComponent, {
        data: { 
          id: this.baseballCard.id, 
          year: this.baseballCard.year,
          firstName: this.baseballCard.firstName, 
          lastName: this.baseballCard.lastName}
      });
    }

    

    updateCard() {    
      let data = { ...this.baseballCard};
      this.baseballCardService.updateCardInDatabase(data);

    }
  }

  @Component({
    selector: 'delete-modal',
    templateUrl: './delete.modal.component.html',
  })
  export class DeleteModalComponent {
    
    constructor(
      private baseballCardService: BaseballCardService,
      public dialogRef: MatDialogRef<DeleteModalComponent>,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: {id: string, year: string, firstName: string, lastName: string}
      ) { }

    deleteCard() {
      this.baseballCardService.deleteCard(this.data.id);
      this.dialogRef.close();

    }

    closeModal(): void {
      this.dialogRef.close();
    }
  }