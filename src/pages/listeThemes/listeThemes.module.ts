import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeThemes } from './listeThemes';

@NgModule({
  declarations: [
    ListeThemes,
  ],
  imports: [
    IonicPageModule.forChild(ListeThemes),
  ],
})
export class ListeThemesModule {}
