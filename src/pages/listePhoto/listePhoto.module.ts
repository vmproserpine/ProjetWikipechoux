import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListePhoto } from './listePhoto';

@NgModule({
  declarations: [
    ListePhoto,
  ],
  imports: [
    IonicPageModule.forChild(ListePhoto),
  ],
})
export class ListePhotoModule {}
