import { Component } from '@angular/core';
import { ToolsService } from 'src/app-core/tools.service';
import { MatDialog } from '@angular/material/dialog';
import { MdComponent } from './components/md/md.component';

import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image-more';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  brownCards: number[]; // Array to hold the number of brown cards
  blueCards: number[]; // Array to hold the number of blue cards
  goldCards: number[]; // Array to hold the number of gold cards

  constructor(private dialog: MatDialog, private tools: ToolsService) {
    this.brownCards = Array(4).fill(0);
    this.blueCards = Array(4).fill(0);
    this.goldCards = Array(5).fill(0);
  }

  colorCodes: { code: string; name: string; quantity: number }[] = [
    { code: "#7a35b0", name: "shadows-tribes", quantity: 1 },
    { code: "#1e90ff", name: "mystic-dominion", quantity: 1 },
    { code: "#cc7920", name: "dragon-clan", quantity: 1 },
    { code: "#c0c0c0", name: "mechanic-league", quantity: 1 },
    { code: "#ff0000", name: "blood-cult", quantity: 1 },
  ];


  openModal(): void {
    const dialogRef = this.dialog.open(MdComponent, {
      // Add any configuration options for the modal here
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }

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

  imgPj = './assets/images/dragon-clan/dragon-sp-3.png'

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

}
