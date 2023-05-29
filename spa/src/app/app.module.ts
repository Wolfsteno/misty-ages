import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// Add more Angular Material modules as needed

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardActionComponent } from './cards/card-action/card-action.component';
import { MdComponent } from './components/md/md.component';
import { ToolsService } from 'src/app-core/tools.service';
import { FormsModule } from '@angular/forms';
import { CardMinionComponent } from './cards/card-minion/card-minion.component';
import { CardPjComponent } from './cards/card-pj/card-pj.component';
import { CardBuildingComponent } from './cards/card-building/card-building.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CardActionComponent,
    CardBuildingComponent,
    CardMinionComponent,
    CardPjComponent,
    MdComponent
  ],
  exports: [
    MdComponent
  ],
  providers: [ToolsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
