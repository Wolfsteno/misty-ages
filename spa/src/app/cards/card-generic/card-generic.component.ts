import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ImgCropperComponent } from 'src/app/components/ImgCropper/ImgCropper.component';
import { DbService } from 'src/app-core/db.service';
import { Card } from 'src/app/models/card';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card-generic',
  templateUrl: './card-generic.component.html',
  styleUrls: ['./card-generic.component.css']
})

export class CardGenericComponent extends ImgCropperComponent implements OnInit, AfterViewInit {

  card = new Card(
    1,                    // id
    'My Card',            // title
    'neutral',            // faction
    [0, 0, 0, 0, 0, 0],   // cost
    'front image',        // front
    'back image',         // back
    'frame image',        // frame
    0,                    // atk
    0,                    // hp
    'effect',             // effect
    'effect type',        // effectType
    'description',        // description
    0,                    // requiredAge
    ['human', 'angel'],   // type
    false,                // isDead
    false,                // isDiscarted
    false,                // isDestroyed
    [],                   // bonuses
    'code name',          // codeName
    '2023-06-02',         // creationDate
    '2023-06-02'          // modificationDate
  );

  beautifyJson(jsonString: string): string {
    try {
      const parsedJson = JSON.parse(jsonString);
      return JSON.stringify(parsedJson, null, 2);
    } catch (error) {
      console.error('Invalid JSON:', error);
      return jsonString;
    }
  }

  cardJson: string;

  constructor(private dbCard: DbService) {
    super();
    this.cardJson = JSON.stringify(this.card, null, 2);
  }

  ngAfterViewInit(): void {
    this.highlightCode();
  }


  highlightCode(): void {
    // Prism.highlightAll(); 
  }

  cardList: Card[] = [];
  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.dbCard.getCards().subscribe(res => {

      this.cardList = [];

      res.forEach((e: any) => {
        console.log(e.payload.doc.id);
        this.cardList.push({
          codeName: e.payload.doc.id,
          ...e.payload.doc.data()
        })
      });
      console.log(this.cardList);
    })

  }

  createCard() {
    this.dbCard.saveCard(this.card);
    this.getCards();
  }

  override imageChangedEvent: any = '';
  override croppedImage: any = '';

  override fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  override imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  override imageLoaded(event: LoadedImage) {
    // show cropper
  }

  override cropperReady() {
    // cropper ready
  }

  override loadImageFailed() {
    // show message
  }

  imgFrame = './assets/images/mystic-dominion/frame-mystic-dominion.png'
  path = './assets/images/_frames/frame-mystic-dominion.png'

  /*
    ./assets/images/_frames/frame-mystic-dominion.png
    ./assets/images/_frames/frame-obsidianeclipse.png
    ./assets/images/_frames/frame-sacreddawn.png
    ./assets/images/_frames/framed-shadowtribe.png
  */

}
