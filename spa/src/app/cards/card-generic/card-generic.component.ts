import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { CardFrames } from 'src/app/game-assets-list/models/card-frames';
import { Card, FactionTypes, MinionTypes } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GameAssets } from 'src/app/game-assets-list/models/game-assets';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { finalize } from 'rxjs/operators';
import { MinionCards } from 'src/app/game-assets-list/models/minion-cards';
import { DbService } from 'src/app-core/db.service';

@Component({
  selector: 'card-generic',
  templateUrl: './card-generic.component.html',
  styleUrls: ['./card-generic.component.css']
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
    'frames/town-centers',
    'frames/buildings',
    'frames/minions',
    'frames/actions'
  ];

  async load() {
    this.getCards();
    this.loadMinions();
    this.loadMinions();
    this.loadGameAssets();
    this.loadFrames();
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

  // selectImg(imageUrl: string, faction: string) {
  //   this.randomCard.front = imageUrl;
  //   this.minionsMd.close(); // Close the modal
  // }

  selectFrame(imageUrl: string) {
    this.randomCard.frame = imageUrl;
  }

  selectRarity(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
  }
  
  async selectAtkImg(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
    const icons = await this.imgGameAssets.icons;
    this.randomCard.atkImg = icons[2];
  }
  
  async selectHpImg(imageUrl: string) {
    this.randomCard.rarity = imageUrl;
    const icons = await this.imgGameAssets.icons;
    this.randomCard.atkImg = icons[1];
  }
  


  imagePaths: string[] = [];

  imgGameAssets: GameAssets = new GameAssets();

  gameAssets: string[] = [
    'general/ages',
    'general/icons',
    'general/rarity',
    'general/back'
  ];


  async loadFrames() {
    for (let i = 0; i < this.frames.length; i++) {
      const e = this.frames[i];
      let urls: string[];

      if (i == 0) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgFrames.townCenters = Promise.resolve(urls);
      }
      if (i == 1) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgFrames.buildings = Promise.resolve(urls);
      }
      if (i == 2) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgFrames.minions = Promise.resolve(urls);
      }
      if (i == 3) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgFrames.actions = Promise.resolve(urls);
      }
    }
  }


  async loadGameAssets() {
    for (let i = 0; i < this.gameAssets.length; i++) {
      const e = this.gameAssets[i];
      let urls: string[];
      
      if (i == 0) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgGameAssets.ages = Promise.resolve(urls);
      }
      if (i == 1) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgGameAssets.icons = Promise.resolve(urls);
      }
      if (i == 2) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgGameAssets.rarity = Promise.resolve(urls);
      }
      if (i == 3) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgGameAssets.back = Promise.resolve(urls);
      }
    }
  }
  //#region NEED TO BE IMPLEMENTED:
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
  showImageCropper: boolean = false;
  croppedImage: string = '';


  selectImg(imageUrl: string, faction: string) {
    // Store the original image URL
    this.randomCard.front = imageUrl;

    // Perform any necessary operations with the imageUrl
    // ...

    // Set the croppedImage property with the selected image URL
    this.croppedImage = imageUrl;

    // Set any other necessary properties or perform additional actions
    // ...

    // Set the flag to display the cropped image or trigger other logic
    this.showImageCropper = true;
  }

  imageCropped(image: any) {
    // Store the cropped image URL
    this.randomCard.front = image;

    // Close the image cropper modal
    this.showImageCropper = false;
    this.minionsMd.close(); // Close the modal
  }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64; // Assign the cropped image data to 'croppedImage'
  //   this.randomCard.front = this.croppedImage; // Update the 'card.front' with the cropped image
  // }


  @ViewChild('minions') minionsMd: any;

  imageLoaded(image: string, format: string): void {
    console.log("Loaded image:", image);
    console.log("Format:", format);
    this.randomCard.front = image;
  }

  // Method called when the cropper is ready
  cropperReady() {
    // Handle cropper ready event if needed
  }

  // Method called when there's an error loading the image
  loadImageFailed() {
    // Handle load image failed event if needed
  }

  imgMinions: MinionCards = new MinionCards();
  minions: string[] = [
    'cards/minions/blood-cult',
    'cards/minions/mechanic-league',
    'cards/minions/mystic-dominion',
    'cards/minions/obisidian-eclipse',
    'cards/minions/sacred-dawn',
    'cards/minions/shadows-tribes',
    'cards/minions/neutral'
  ];

  async loadMinions() {
    for (let i = 0; i < this.minions.length; i++) {
      const e = this.minions[i];
      let urls: string[];

      if (i == 0) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.bloodCult = Promise.resolve(urls);
      }
      if (i == 1) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.mechanicLeague = Promise.resolve(urls);
      }
      if (i == 2) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.mysticDominion = Promise.resolve(urls);
      }
      if (i == 3) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.obisidianEclipse = Promise.resolve(urls);
      }
      if (i == 4) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.sacredDawn = Promise.resolve(urls);
      }
      if (i == 5) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.shadowTribes = Promise.resolve(urls);
      }
      if (i == 6) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgMinions.neutral = Promise.resolve(urls);
      }

    }
  }
  
  selectedImage?: File;

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }


  //#region md handlers
  handleOk() { }

  handleCancel() { }
  //#endregion

  selectedMinionImage: string | undefined;

  handleImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Process the selected image file here (e.g., pass it to the image cropper)
      console.log("Selected image file:", file);
    }
  }
}
