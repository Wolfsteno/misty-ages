import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DbService } from 'src/app-core/db.service';
import { CardFrames } from './models/card-frames';
import { GameAssets } from './models/game-assets';
import { BuildingCards } from './models/building-cards';
import { MinionCards } from './models/minion-cards';
import { ActionCards } from './models/action-cards';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-assets-list',
  templateUrl: './game-assets-list.component.html',
  styleUrls: ['./game-assets-list.component.css']
})
export class GameAssetsListComponent implements AfterViewInit {
  faTimes = faTimes


  buildings: string[] = [
    'cards/buildings/blood-cult',
    'cards/buildings/mechanic-league',
    'cards/buildings/mystic-dominion',
    'cards/buildings/obisidian-eclipse',
    'cards/buildings/sacred-dawn',
    'cards/buildings/shadows-tribes',
    'cards/buildings/neutral'
  ];

  minions: string[] = [
    'cards/minions/blood-cult',
    'cards/minions/mechanic-league',
    'cards/minions/mystic-dominion',
    'cards/minions/obisidian-eclipse',
    'cards/minions/sacred-dawn',
    'cards/minions/shadows-tribes',
    'cards/minions/neutral'
  ];

  actions: string[] = [
    'cards/action/blood-cult',
    'cards/actions/mechanic-league',
    'cards/actions/mystic-dominion',
    'cards/actions/obisidian-eclipse',
    'cards/actions/sacred-dawn',
    'cards/actions/shadows-tribes'
  ];

  frames: string[] = [
    'frames/town-centers',
    'frames/buildings',
    'frames/minions',
    'frames/actions'
  ];

  gameAssets: string[] = [
    'general/ages',
    'general/icons',
    'general/rarity',
    'general/back'
  ];

  imgBuildings: BuildingCards = new BuildingCards();
  imgMinions: MinionCards = new MinionCards();
  imgActions: ActionCards = new ActionCards();
  imgFrames: CardFrames = new CardFrames();
  imgGameAssets: GameAssets = new GameAssets();

  imagePaths: string[] = [];

  constructor(private fire: DbService, private storage: AngularFireStorage) {
    this.loadImages();
    this.loadBuildings();
    this.loadMinions();
    this.loadActions();
    this.loadFrames();
    this.loadGameAssets();
  }

  async loadImages() {
    const imagePaths = await this.fire.listAll('cards/buildings/blood-cult');
    const urls = await this.fire.getImages(imagePaths);
    this.imagePaths = urls;
  }

  async loadBuildings() {
    for (let i = 0; i < this.buildings.length; i++) {
      const e = this.buildings[i];

      if (i == 0) {
        this.imgBuildings.bloodCult = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.bloodCult);
        this.imgBuildings.bloodCult = urls;
      }
      if (i == 1) {
        this.imgBuildings.mechanicLeague = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.mechanicLeague);
        this.imgBuildings.mechanicLeague = urls;
      }
      if (i == 2) {
        this.imgBuildings.mysticDominion = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.mysticDominion);
        this.imgBuildings.mysticDominion = urls;
      }
      if (i == 3) {
        this.imgBuildings.obisidianEclipse = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.obisidianEclipse);
        this.imgBuildings.obisidianEclipse = urls;
      }
      if (i == 4) {
        this.imgBuildings.sacredDawn = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.sacredDawn);
        this.imgBuildings.sacredDawn = urls;
      }
      if (i == 5) {
        this.imgBuildings.shadowsTribes = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.shadowsTribes);
        this.imgBuildings.shadowsTribes = urls;
      }
      if (i == 6) {
        this.imgBuildings.neutral = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgBuildings.neutral);
        this.imgBuildings.neutral = urls;
      }

    }
  }

  async loadMinions() {
    for (let i = 0; i < this.minions.length; i++) {
      const e = this.minions[i];

      if (i == 0) {
        this.imgMinions.bloodCult = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.bloodCult);
        this.imgMinions.bloodCult = urls;
      }
      if (i == 1) {
        this.imgMinions.mechanicLeague = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.mechanicLeague);
        this.imgMinions.mechanicLeague = urls;
      }
      if (i == 2) {
        this.imgMinions.mysticDominion = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.mysticDominion);
        this.imgMinions.mysticDominion = urls;
      }
      if (i == 3) {
        this.imgMinions.obisidianEclipse = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.obisidianEclipse);
        this.imgMinions.obisidianEclipse = urls;
      }
      if (i == 4) {
        this.imgMinions.sacredDawn = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.sacredDawn);
        this.imgMinions.sacredDawn = urls;
      }
      if (i == 5) {
        this.imgMinions.shadowsTribes = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.shadowsTribes);
        this.imgMinions.shadowsTribes = urls;
      }
      if (i == 6) {
        this.imgMinions.neutral = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgMinions.neutral);
        this.imgMinions.neutral = urls;
      }

    }
  }

  async loadActions() {
    for (let i = 0; i < this.actions.length; i++) {
      const e = this.actions[i];

      if (i == 0) {
        this.imgActions.bloodCult = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.bloodCult);
        this.imgActions.bloodCult = urls;
      }
      if (i == 1) {
        this.imgActions.mechanicLeague = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.mechanicLeague);
        this.imgActions.mechanicLeague = urls;
      }
      if (i == 2) {
        this.imgActions.mysticDominion = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.mysticDominion);
        this.imgActions.mysticDominion = urls;
      }
      if (i == 3) {
        this.imgActions.obisidianEclipse = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.obisidianEclipse);
        this.imgActions.obisidianEclipse = urls;
      }
      if (i == 4) {
        this.imgActions.sacredDawn = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.sacredDawn);
        this.imgActions.sacredDawn = urls;
      }
      if (i == 5) {
        this.imgActions.shadowsTribes = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgActions.shadowsTribes);
        this.imgActions.shadowsTribes = urls;
      }

    }
  }

  async loadFrames() {
    for (let i = 0; i < this.frames.length; i++) {
      const e = this.frames[i];

      if (i == 0) {
        this.imgFrames.townCenters = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgFrames.townCenters);
        this.imgFrames.townCenters = urls;
      }
      if (i == 1) {
        this.imgFrames.buildings = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgFrames.buildings);
        this.imgFrames.buildings = urls;
      }
      if (i == 2) {
        this.imgFrames.minions = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgFrames.minions);
        this.imgFrames.minions = urls;
      }
      if (i == 3) {
        this.imgFrames.actions = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgFrames.actions);
        this.imgFrames.actions = urls;
      }

    }
  }

  async loadGameAssets() {
    for (let i = 0; i < this.gameAssets.length; i++) {
      const e = this.gameAssets[i];

      if (i == 0) {
        this.imgGameAssets.ages = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgGameAssets.ages);
        this.imgGameAssets.ages = urls;
      }
      if (i == 1) {
        this.imgGameAssets.icons = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgGameAssets.icons);
        this.imgGameAssets.icons = urls;
      }
      if (i == 2) {
        this.imgGameAssets.rarity = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgGameAssets.rarity);
        this.imgGameAssets.rarity = urls;
      }
      if (i == 3) {
        this.imgGameAssets.back = await this.fire.listAll(e);
        const urls = await this.fire.getImages(this.imgGameAssets.back);
        this.imgGameAssets.back = urls;
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

  async uploadImage(p: string) {
    if (this.selectedImage) {
      const url = await this.fire.uploadImage(this.selectedImage, p + '/' + this.selectedImage.name);
      this.loadImages();
      this.loadBuildings();
      this.loadMinions();
      this.loadActions();
      this.loadFrames();
      this.loadGameAssets();
    }
    this.selectedImage = undefined;
  }

  ngAfterViewInit() { }

  handleOk() { }

  handleCancel() { }

  async deleteImg(path: string) {
    try {
      await this.fire.deleteImage(path);
      console.log('Image deleted successfully');
      this.loadImages();
      this.loadBuildings();
      this.loadMinions();
      this.loadActions();
      this.loadFrames();
      this.loadGameAssets();
    } catch (error) {
      console.error('Failed to delete image:', error);
    }

  }

// Method to parse Firebase Storage path from download URL
parseFirebasePath(directory: string, downloadUrl: string): string {
  // Extract the file path from the download URL
  const filePath = decodeURIComponent(downloadUrl.split('/o/')[1].split('?')[0]);

  // Append the file path to the directory
  const fullPath = `${directory}/${filePath.split('/').pop()}`;

  return fullPath;
}


}
