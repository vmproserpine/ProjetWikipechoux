import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeAnnexe } from './listeAnnexe';

@NgModule({
  declarations: [
    ListeAnnexe,
  ],
  imports: [
    IonicPageModule.forChild(ListeAnnexe),
  ],
})
export class ListeAnnexeModule {}
