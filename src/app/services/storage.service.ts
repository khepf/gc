import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable()
export class UIService {
  constructor(private afStorage: AngularFireStorage) {}
  uploadCardImage(event: any) {
    this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
  }
}
