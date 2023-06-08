import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getCards(): Observable<any> {
    return this.firestore.collection('cards').snapshotChanges();
  }

  saveCard(card: Card): Promise<any> {

    const cardObject = card;
    const cardData = { ...cardObject };

    return this.firestore.collection('cards').add(cardData).then(() => {
      console.log('Card saved succesful');
    }, error => {
      console.error('Card saved error', error);
    });
  }

  // Upload a single image
  async uploadImage(image: File, path: string): Promise<string> {
    const ref = this.storage.ref(path);
    await ref.put(image);
    return ref.getDownloadURL().toPromise();
  }

  // Upload multiple images
  async uploadImages(images: File[], path: string): Promise<string[]> {
    const urls: string[] = [];
    for (const image of images) {
      const url = await this.uploadImage(image, `${path}/${image.name}`);
      urls.push(url);
    }
    return urls;
  }

  // Get a single image
  getImage(path: string): Promise<string> {
    return this.storage.ref(path).getDownloadURL().toPromise();
  }

  // Get multiple images
  async getImages(paths: string[]): Promise<string[]> {
    const urls: string[] = [];
    for (const path of paths) {
      const url = await this.getImage(path);
      urls.push(url);
    }
    return urls;
  }

  // List all files in a directory
// List all files in a directory
async listAll(directory: string): Promise<string[]> {
  try {
    const ref = this.storage.ref(directory);
    const res = await ref.listAll().toPromise();
    if (res != undefined) {
      return res.items.map(item => item.fullPath);      
    } else {
      return Promise.resolve(['ERROR']);
    }
  } catch (error) {
    console.error('Failed to list all files:', error);
    return [];
  }
}



}

