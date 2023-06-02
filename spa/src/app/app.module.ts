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
import { CardGenericComponent } from './cards/card-generic/card-generic.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImgCropperComponent } from './components/ImgCropper/ImgCropper.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';

@NgModule({
  imports: [
    // provideFirebaseApp(() => initializeApp({})),
    // provideFirestore(() => getFirestore()),
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    ImageCropperModule,
    AngularFirestoreModule,
    FirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  declarations: [
    AppComponent,
    CardActionComponent,
    CardBuildingComponent,
    CardMinionComponent,
    CardPjComponent,
    CardGenericComponent,
    MdComponent,
    ImgCropperComponent
  ],
  exports: [
    MdComponent
  ],
  providers: [ToolsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
