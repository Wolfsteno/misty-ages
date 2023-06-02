import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firebase: AngularFirestore) {

  }

  getCards(): Observable<any> {
    return this.firebase.collection('cards').snapshotChanges();
  }

  saveCard(card: Card): Promise<any> {

    const cardObject = card;
    const cardData = { ...cardObject };

    return this.firebase.collection('cards').add(cardData).then(() => {
      console.log('Card saved succesful');
    }, error => {
      console.error('Card saved error', error);
    });
  }


}
