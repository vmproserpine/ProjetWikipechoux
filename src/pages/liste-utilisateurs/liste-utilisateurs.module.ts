import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeUtilisateursPage } from './liste-utilisateurs';

@NgModule({
  declarations: [
    ListeUtilisateursPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeUtilisateursPage),
  ],
})
export class ListeUtilisateursPageModule {}
