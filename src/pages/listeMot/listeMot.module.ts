import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeMot } from './listeMot';

@NgModule({
  declarations: [
    ListeMot,
  ],
  imports: [
    IonicPageModule.forChild(ListeMot),
  ],
})
export class ListeMotModule {}
