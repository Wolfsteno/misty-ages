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
  templateUrl: './game-assets-list.component.html'
})
export class GameAssetsListComponent {
  faTimes = faTimes

  parseFirebasePath(directory: string, downloadUrl: string): string {
    // Extract the file path from the download URL
    const filePath = decodeURIComponent(downloadUrl.split('/o/')[1].split('?')[0]);

    // Append the file path to the directory
    const fullPath = `${directory}/${filePath.split('/').pop()}`;

    return fullPath;
  }

  // #region props + ctor
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

  constructor(private dbService: DbService, private storage: AngularFireStorage) {
    this.load();
  }

  //#endregion

  // #region loaders
  async load() {
    this.loadBuildings();
    this.loadMinions();
    this.loadActions();
    this.loadFrames();
    this.loadGameAssets();
  }

  async loadImages(array: string[], object: any, propertyNames: string[]) {
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      object[propertyNames[i]] = await this.dbService.listAll(e);
      const urls = await this.dbService.getImages(object[propertyNames[i]]);
      object[propertyNames[i]] = urls;
    }
  }

  async loadBuildings() {
    for (let i = 0; i < this.buildings.length; i++) {
      const e = this.buildings[i];
      let urls: string[];

      if (i == 0) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.bloodCult = Promise.resolve(urls);
      }
      if (i == 1) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.mechanicLeague = Promise.resolve(urls);
      }
      if (i == 2) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.mysticDominion = Promise.resolve(urls);
      }
      if (i == 3) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.obisidianEclipse = Promise.resolve(urls);
      }
      if (i == 4) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.sacredDawn = Promise.resolve(urls);
      }
      if (i == 5) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.shadowTribes = Promise.resolve(urls);
      }
      if (i == 6) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgBuildings.neutral = Promise.resolve(urls);
      }

    }
  }

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

  async loadActions() {
    for (let i = 0; i < this.actions.length; i++) {
      const e = this.actions[i];
      let urls: string[];

      if (i == 0) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.bloodCult = Promise.resolve(urls);
      }
      if (i == 1) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.mechanicLeague = Promise.resolve(urls);
      }
      if (i == 2) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.mysticDominion = Promise.resolve(urls);
      }
      if (i == 3) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.obisidianEclipse = Promise.resolve(urls);
      }
      if (i == 4) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.sacredDawn = Promise.resolve(urls);
      }
      if (i == 5) {
        urls = await this.dbService.getImages(await this.dbService.listAll(e));
        this.imgActions.shadowTribes = Promise.resolve(urls);
      }


    }
  }

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
  //#endregion

  // #region image handler
  selectedImage?: File;

  onImageSelected(event: Event, p: string = '') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(p);
    }
  }

  async uploadImage(p: string) {
    if (this.selectedImage) {
      const url = await this.dbService.uploadImage(this.selectedImage, p + '/' + this.selectedImage.name);
      this.load();
    }
    this.selectedImage = undefined;
  }

  async deleteImg(path: string) {
    try {
      await this.dbService.deleteImage(path);
      console.log('Image deleted successfully');
      this.load();
    } catch (error) {
      console.error('Failed to delete image:', error);
    }

  }
  //#endregion

  //#region md handlers
  handleOk() { }

  handleCancel() { }
  //#endregion

  isImageDisabled(): boolean {
    return this.selectedImage == null || this.selectedImage == undefined;
  }
}
