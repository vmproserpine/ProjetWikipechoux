import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeUser } from './listeUser';

@NgModule({
  declarations: [
    ListeUser,
  ],
  imports: [
    IonicPageModule.forChild(ListeUser),
  ],
})
export class ListeUserModule {}
