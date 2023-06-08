import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardActionComponent } from './cards/card-action/card-action.component';
import { CardBuildingComponent } from './cards/card-building/card-building.component';
import { CardMinionComponent } from './cards/card-minion/card-minion.component';
import { CardPjComponent } from './cards/card-pj/card-pj.component';
import { CardGenericComponent } from './cards/card-generic/card-generic.component';
import { DeckCreatorComponent } from './deck-creator/deck-creator.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { GameAssetsListComponent } from './game-assets-list/game-assets-list.component';
import { LoreComponent } from './lore/lore.component';
import { GameRulesComponent } from './game-rules/game-rules.component';

const routes: Routes = [
  // { path: 'card-pj', component: CardPjComponent },
  // { path: 'card-minion', component: CardMinionComponent },
  // { path: 'card-building', component: CardBuildingComponent },
  // { path: 'card-action', component: CardActionComponent },
  // { path: 'card-generic', component: CardGenericComponent },
  { path: 'rules', component: GameRulesComponent },
  { path: 'lore', component: LoreComponent },
  { path: 'game-assets-list', component: GameAssetsListComponent },
  { path: 'card-list', component: CardListComponent },
  { path: 'card-generic', component: CardGenericComponent },
  { path: 'deck-creator', component: DeckCreatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }