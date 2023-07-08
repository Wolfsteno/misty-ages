import { Component, Input } from '@angular/core';
import { Card, Minion } from 'src/app/models/card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;

  hitpointsImg = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FHEALTH_ICON.png?alt=media&token=94df9d0c-288a-4073-b88d-c2ca4d720173)'
  atkImg = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FICON_DAMAGE.png?alt=media&token=03363522-7ba1-4eda-b499-3f75fb3520be)'
  // hpImg = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FHEALTH_ICON.png?alt=media&token=94df9d0c-288a-4073-b88d-c2ca4d720173)'
  hpImg = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2Ftextvida.png?alt=media&token=61a413af-d937-40eb-9b67-20d8cf790cf1)'
  
  // src="https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2Ftextvida.png?alt=media&token=61a413af-d937-40eb-9b67-20d8cf790cf1"
  goldResource = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FGOLD_ICON.png?alt=media&token=b7b4dec9-2d2e-402f-b041-84796718fb9c)'
  redResource = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FRed.png?alt=media&token=d43dd873-f9a5-4996-b5bb-116db047a413)'
  greenResource = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FGreen.png?alt=media&token=21e9de6f-7746-4133-8bdd-c2911340f7f7)'
  blueResource = 'url(https://firebasestorage.googleapis.com/v0/b/misty-ages.appspot.com/o/general%2Ficons%2FBlue.png?alt=media&token=70f6cc1b-0d34-4287-8fc7-b784f7955efd)'

}
