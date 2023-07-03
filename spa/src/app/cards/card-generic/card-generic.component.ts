import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { CardFrames } from 'src/app/game-assets-list/models/card-frames';
import { Card, FactionTypes, MinionTypes } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DbService } from 'src/app-core/db.service';
import { GameAssets } from 'src/app/game-assets-list/models/game-assets';

@Component({
  selector: 'card-generic',
  templateUrl: './card-generic.component.html',
  styles: [`
* {
font-size: 16px;
font-family: 'MistyTxt';
}

.split-screen {
display: flex;
height: 90vh;
}

.left-half, .right-half {
position: relative;
flex: 1;
border: 2px solid brown;
}

.left-half {
display: flex;
justify-content: center;
}

.right-half {
padding: 10px;
}

.property {
margin-bottom: 10px;
}

span {
  font-size: 15px;

}
`]
})

export class CardGenericComponent implements DbService, OnInit {
  firestore: AngularFirestore;

  randomCard: Card = {} as Card;

  factionTypes: string[] = ['sacred-dawn', 'shadow-tribes', 'mystic-dominion', 'mechanic-league', 'obsidian-eclipse', 'blood-cult', 'neutral'];
  minionTypes: string[] = ['angel', 'beast', 'demon', 'dragon', 'dwarf', 'elf', 'fairy', 'goblin', 'human', 'merfolk', 'orc', 'undead', 'vampire', 'werewolf', 'witch', 'elemental', 'knight'];
  rarities: string[] = ["basic", "common", "epic", "rare", "legendary"];

  constructor(
    public dbService: DbService,
    public storage: AngularFireStorage,
    public angularFirestore: AngularFirestore,
  ) {
    this.firestore = this.angularFirestore;
  }

  getRandomValueFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateRandomCard(): Card {
    const randomFaction = this.getRandomValueFromArray(FactionTypes);
    const randomType = this.getRandomValueFromArray(MinionTypes);
    const randomCost = [
      this.getRandomInt(1, 10),
      this.getRandomInt(0, 3),
      this.getRandomInt(0, 3),
      this.getRandomInt(0, 3)
    ];
    const randomAtk = this.getRandomInt(0, 10);
    const randomHp = this.getRandomInt(0, 10);

    const randomCard = new Card(
      1, // You can provide a unique identifier or generate it randomly as well
      'Crossbreed warrior',
      randomFaction,
      randomType,
      'https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Frarity%2Fcommon.png?alt=media&token=891ea42b-cb15-4c7c-bbdd-a4ef7a4ffee1',
      randomCost,
      'front',
      'back',
      'https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/frames%2Fminions%2Fmystic-dominion.png?alt=media&token=a7b77c50-2109-4187-8844-e3cfee74f5b1',
      randomAtk,
      'atkImg',      
      0,
      'rAtkImg',      
      randomHp,
      'hpImg',      
      'Give +1/+1 to an ally. If it is damaged then give instead +0/+2',
      'Warcry',
      '"Within the shadows, forgotten whispers beckon, revealing the fractured tapestry of a lost realm."',
      'creationDate',
      'modificationDate'
    );

    return randomCard;
  }

  ngOnInit(): void {
    this.randomCard = this.generateRandomCard();
    this.load();
  }

  imgFrames: CardFrames = new CardFrames();

  frames: string[] = [
    'frames/minions',
  ];

  async load() {
    this.getCards();
    this.loadImages(this.frames, this.imgFrames, ['minions']);
    this.loadImages(this.gameAssets, this.imgGameAssets, ['ages', 'icons', 'rarity', 'back']);
  }


  onFactionChange() {
    console.log('Faction changed:', this.randomCard.faction);
    // Perform additional logic or actions based on the selected faction

    switch (this.randomCard.faction) {
      case 'sacred-dawn':
        this.getImage('sacred-dawn.jpg');
        break;
      case 'shadow-tribes':
        this.getImage('shadow-tribes.jpg');
        break;
      case 'mystic-dominion':
        this.getImage('mystic-dominion.jpg');
        break;
      case 'mechanic-league':
        this.getImage('mechanic-league.jpg');
        break;
      case 'obsidian-eclipse':
        this.getImage('obsidian-eclipse.jpg');
        break;
      case 'blood-cult':
        this.getImage('blood-cult.jpg');
        break;
      case 'neutral':
        this.getImage('neutral.jpg');
        break;
      default:
        this.randomCard.frame = ''; // Reset the image URL if no match is found
        break;
    }
  }


  selectFrame(imageUrl: string) {
    this.randomCard.frame = imageUrl;
  }

  selectRarity(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
  }

  selectAtkImg(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
    for (let i = 0; i < this.imgGameAssets.icons.length; i++) {
      this.randomCard.atkImg = this.imgGameAssets.icons[2];
    }
  }

  selectHpImg(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
    for (let i = 0; i < this.imgGameAssets.icons.length; i++) {
      this.randomCard.atkImg = this.imgGameAssets.icons[1];
    }
  }


  imagePaths: string[] = [];

  imgGameAssets: GameAssets = new GameAssets();

  gameAssets: string[] = [
    'general/ages',
    'general/icons',
    'general/rarity',
    'general/back'
  ];


  async loadGameAssets() {
    for (let i = 0; i < this.gameAssets.length; i++) {
      const e = this.gameAssets[i];

      if (i == 0) {
        this.imgGameAssets.ages = await this.dbService.listAll(e);
        const urls = await this.dbService.getImages(this.imgGameAssets.ages);
        this.imgGameAssets.ages = urls;
      }
      if (i == 1) {
        this.imgGameAssets.icons = await this.dbService.listAll(e);
        const urls = await this.dbService.getImages(this.imgGameAssets.icons);
        this.imgGameAssets.icons = urls;
      }
      if (i == 2) {
        this.imgGameAssets.rarity = await this.dbService.listAll(e);
        const urls = await this.dbService.getImages(this.imgGameAssets.rarity);
        this.imgGameAssets.rarity = urls;
      }
      if (i == 3) {
        this.imgGameAssets.back = await this.dbService.listAll(e);
        const urls = await this.dbService.getImages(this.imgGameAssets.back);
        this.imgGameAssets.back = urls;
      }

    }
  }

  //#region NOT IMPLEMENTED:
  async loadImages(array: string[], object: any, propertyNames: string[]) {
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      object[propertyNames[i]] = await this.dbService.listAll(e);
      const urls = await this.dbService.getImages(object[propertyNames[i]]);
      object[propertyNames[i]] = urls;
    }
  }

  getCards(): Observable<any> {
    return this.firestore.collection('cards').snapshotChanges();
  }

  saveCard(card: Card): Promise<any> {
    throw new Error('Method not implemented.');
  }
  uploadImage(image: File, path: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  uploadImages(images: File[], path: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  getImage(imageName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storageRef = this.storage.ref(imageName);
      storageRef.getDownloadURL().subscribe(
        url => {
          resolve(url);
        },
        error => {
          console.log('Error loading image from Firebase:', error);
          reject(error);
        }
      );
    });
  }

  getImages(paths: string[]): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  listAll(directory: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  deleteImage(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  //#endregion
}
