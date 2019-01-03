import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeVideo } from './listeVideo';

@NgModule({
  declarations: [
    ListeVideo,
  ],
  imports: [
    IonicPageModule.forChild(ListeVideo),
  ],
})
export class LListeVideoModule {}
