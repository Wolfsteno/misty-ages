import { AfterViewInit, Component } from '@angular/core';
import { ToolsService } from 'src/app-core/tools.service';
import { MatDialog } from '@angular/material/dialog';
import { MdComponent } from './components/md/md.component';

import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image-more';
import { DbService } from 'src/app-core/db.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {

  selectedPhoto: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    //    console.log(file);
    this.selectedPhoto = URL.createObjectURL(file);
    //    console.log(this.selectedPhoto);
  }

  brownCards: number[]; // Array to hold the number of brown cards
  blueCards: number[]; // Array to hold the number of blue cards
  goldCards: number[]; // Array to hold the number of gold cards

  imgHorizontalPositionTg: number = 0;
  imgVerticalPositionTg: number = 0;
  backgroundSizeTg: string = 'auto';
  defTg: string = '';
  atkTg: string = '';
  imgFactionTg: string = '';
  imgFactionsTg: string[] = [];
  cardTitleTg: string = '';
  colorCodes: { code: string, quantity: number, showHide: boolean }[] = [];
  ageRequiredTg: number = 1;
  cardEffectTg: string = '';
  cardDescriptionTg: string = '';
  showHideImgHorizontal: boolean = false;
  showHideImgVertical: boolean = false;
  showHideBackgroundSize: boolean = false;
  showHideAttackDefense: boolean = false;
  showHideFaction: boolean = false;
  showHideRequiredAge: boolean = false;
  showHideEffect: boolean = false;
  showHideDescription: boolean = false;

  constructor(private dialog: MatDialog, private tools: ToolsService, private fire: DbService, private storage: AngularFireStorage) {
    this.brownCards = Array(4).fill(0);
    this.blueCards = Array(4).fill(0);
    this.goldCards = Array(5).fill(0);
    // this.randomColor();
    this.loadImagePaths();
    this.loadImages();
  }

  async loadImages() {
    const imagePaths = await this.fire.listAll('cards/buildings/blood-cult');
    const urls = await this.fire.getImages(imagePaths);
    this.images = urls;
  }

  imagePaths: string[] = [];
  imgs: string[] = [];
  async lImagePaths() {
    this.imagePaths = await this.fire.listAll('cards/buildings/blood-cult');
    this.loadImages();
  }

  downloadURL: any;
  ngAfterViewInit(): void {
    this.formattedPaths = this.formatFilePaths(this.filePaths);

    const path = 'cards/buildings/blood-cult';
    const ref = this.storage.ref(path);
    this.downloadURL = ref.getDownloadURL();
  }

  images: string[] = [];
  selectedImage?: File;

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  async uploadImage() {
    if (this.selectedImage) {
      const url = await this.fire.uploadImage(this.selectedImage, 'test/' + this.selectedImage.name);
      // this.images.push(url);


    }
  }


  async lImages() {
    for (const path of this.imagePaths) {
      const url = await this.fire.getImage(path);
      this.images.push(url);
    }
  }
  //#region
  colorCodesList: { code: string; name: string; quantity: number }[] = [
    { code: "#7a35b0", name: "shadows-tribes", quantity: 1 },
    { code: "#1e90ff", name: "mystic-dominion", quantity: 1 },
    { code: "#cc7920", name: "dragon-clan", quantity: 1 },
    { code: "#c0c0c0", name: "mechanic-league", quantity: 1 },
    { code: "#ff0000", name: "blood-cult", quantity: 1 },
  ];


  // openModal(): void {
  //   const dialogRef = this.dialog.open(MdComponent, {
  //     // Add any configuration options for the modal here
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // Handle any actions after the modal is closed
  //   });
  // }

  cardTitle = 'Dragon crossbreed warrior';
  cardDescription = 'A legendary warrior that embodies the fusion of two mighty dragon lineages. This fearsome warrior inherits the strength and power of both fire-breathing dragons and golden-scaled serpents.';
  cardEffect = 'Effect: If when played there is another of this same unit, it gains +1/+1.';

  bottom = ''
  left = ''
  right = ''
  top = ''

  def = '3'
  atk = '2'

  backgroundSize = 'cover';

  img = './assets/images/dragon-clan/dragon-sp-2.png'

  imgFaction = './assets/images/_faction-icons/dragon-clan.png'
  imgFactions: string[] = [
    './assets/images/_faction-icons/blood-cult.png',
    './assets/images/_faction-icons/dragon-clan.png',
    './assets/images/_faction-icons/mechanic-league.png',
    './assets/images/_faction-icons/mystic-dominion.png',
    './assets/images/_faction-icons/shadows-tribes.png',
  ];


  imgVerticalPosition = '50px'
  imgVerticalPositionParser(v: string) {
    this.imgVerticalPosition = v + 'px';
  }

  imgHorizontalPosition = '0px'
  imgHorizontalPositionParser(v: string) {
    this.imgHorizontalPosition = v + 'px';
  }

  @ViewChild('cardElement', { static: true }) cardElement!: ElementRef;
  saveAsImage(): void {
    if (this.cardElement) {
      const card = this.cardElement.nativeElement;

      // Set the desired width and height for the card element
      card.style.width = '660px';
      card.style.height = '860px';

      domtoimage.toPng(card)
        .then((dataUrl: string) => {
          // Reset the width and height of the card element
          card.style.width = '';
          card.style.height = '';

          // Create a temporary <a> element to download the image
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = this.parseDownloadFileName();;
          link.click();
        })
        .catch((error: any) => {
          console.error('Error saving image:', error);
        });
    }
  }

  parseDownloadFileName(): string {
    const factionName = this.extractFileName(this.imgFaction);
    const cardTitle = this.cardTitle.toLowerCase().replace(/\s/g, '_');
    return `${factionName}-${cardTitle}.png`;
  }

  extractFileName(path: string): string {
    const fileNameWithExtension = path.split('/').pop();
    if (fileNameWithExtension) {
      const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.');
      return fileName.toLowerCase();
    }
    return '';
  }



  frontView = true;
  switch() { this.frontView = !this.frontView }

  ageRequired = 3;
  changeAge() {
    if (this.ageRequired == 1) {
      this.imgBack = './assets/images/back/1.png'
    }
    if (this.ageRequired == 2) {
      this.imgBack = './assets/images/back/2.png'
    }
    if (this.ageRequired == 3) {
      this.imgBack = './assets/images/back/3.png'
    }
  }
  imgBack = './assets/images/back/1.png'


  uploadFront() { }
  uploadBack() { }
  seePics() { }

  selectedColor: string = '#e3d04f'; // Initialize with a default color

  changeColor(c = '') {
    if (c != '') {
      this.changeColor2();
      return '10px solid ' + c
    } else {
      this.changeColor2();
      return '10px solid ' + this.selectedColor
    }
  }
  changeColor2(c = '') {
    return this.selectedColor
  }

  randomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.selectedColor = randomColor
  }

  formatFilePaths(filePaths: string[]): string[] {
    const formattedPaths: string[] = [];

    for (const filePath of filePaths) {
      const formattedPath = filePath
        .replace(/\\/g, '/') // Replace backslashes with forward slashes
        .replace(/.*?assets/, './assets'); // Replace the initial path with './assets'

      formattedPaths.push(formattedPath);
    }

    return formattedPaths;
  }

  formattedPaths: any;
  filePaths = [];

  neutralColors: string[] = [
    '#000000',
    '#7a35b0',
    '#1e90ff',
    '#cc7920',
    '#c0c0c0',
    '#ff0000',   // Black
    '#808080',   // Gray
    '#F5F5DC',   // Beige
    '#483C32',   // Taupe
    '#FFFFF0',   // Ivory
    '#C2B280',   // Sand
    '#708090',   // Slate
    '#B2BEB5',   // Ash
    '#BA9E88',   // Mushroom
    '#877C77',   // Stone
    '#FAF0E6'    // Linen
  ];


  applyColor(color: string) {
    this.selectedColor = color;
    //    console.log('Applying color:', color);
    this.changeColor(color)
  }

  //#endregion

  handleOk() {
    console.log('Ok clicked');
  }

  handleCancel() {
    console.log('Cancel clicked');
  }

  async loadImagePaths() {
    this.imagePaths = await this.fire.listAll('cards/buildings/blood-cult');
    this.loadImages();
  }


}
