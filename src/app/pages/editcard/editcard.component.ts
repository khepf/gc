import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseballCardService } from 'src/app/services/baseball-card.service';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-editcard',
    templateUrl: './editcard.component.html',
    styleUrls: ['./editcard.component.scss']
  })
  export class EditCardComponent implements OnInit{
    baseballCard: any = {};
    baseballCardRef: any = {};

    constructor(private baseballCardService: BaseballCardService, private route: ActivatedRoute) { }

    ngOnInit() {
      
      this.baseballCard = this.baseballCardService.fetchBaseballCard();
    }

    deleteCard() {
      this.baseballCardService.deleteCard(this.baseballCard.id); 
    }

    updateCard() {    
      let data = { ...this.baseballCard};
      this.baseballCardService.updateCardInDatabase(data);

    }
  }