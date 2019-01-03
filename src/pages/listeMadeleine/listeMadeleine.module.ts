import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeMadeleine } from './listeMadeleine';

@NgModule({
  declarations: [
    ListeMadeleine,
  ],
  imports: [
    IonicPageModule.forChild(ListeMadeleine),
  ],
})
export class ListeMadeleineModule {}
