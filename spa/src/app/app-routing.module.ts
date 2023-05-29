import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardActionComponent } from './cards/card-action/card-action.component';
import { CardBuildingComponent } from './cards/card-building/card-building.component';
import { CardMinionComponent } from './cards/card-minion/card-minion.component';
import { CardPjComponent } from './cards/card-pj/card-pj.component';

const routes: Routes = [
  { path: 'card-pj', component: CardPjComponent },
  { path: 'card-minion', component: CardMinionComponent },
  { path: 'card-building', component: CardBuildingComponent },
  { path: 'card-action', component: CardActionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }