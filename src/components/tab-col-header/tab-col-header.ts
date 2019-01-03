import { Component } from '@angular/core';

/**
 * Generated class for the TabColHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-col-header',
  templateUrl: 'tab-col-header.html'
})
export class TabColHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello TabColHeaderComponent Component');
    this.text = 'Hello World';
  }

}
