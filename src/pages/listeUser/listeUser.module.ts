import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeUtilisateursPage } from './listeUser';

@NgModule({
  declarations: [
    ListeUtilisateursPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeUtilisateursPage),
  ],
})
export class ListeUtilisateursPageModule {}
