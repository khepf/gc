import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';

import { BaseballCardService } from 'src/app/services/baseball-card.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private baseballCardService: BaseballCardService, private auth: AngularFireAuth) {}

  ngOnInit(): void {}
}
