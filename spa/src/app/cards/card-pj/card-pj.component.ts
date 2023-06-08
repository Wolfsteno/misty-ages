import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-pj',
  templateUrl: './card-pj.component.html',
  styleUrls: ['./card-pj.component.css']
})
export class CardPjComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
