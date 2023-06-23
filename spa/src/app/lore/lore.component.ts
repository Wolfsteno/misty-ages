import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.component.html'
})
export class LoreComponent {

  constructor() { }

  tLanguage = true;
  toggleLanguage() {
    this.tLanguage = !this.tLanguage;
  }

}
