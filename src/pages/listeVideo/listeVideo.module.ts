import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeExposantsPage } from './listeVideo';

@NgModule({
  declarations: [
    ListeExposantsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeExposantsPage),
  ],
})
export class ListeExposantsPageModule {}
