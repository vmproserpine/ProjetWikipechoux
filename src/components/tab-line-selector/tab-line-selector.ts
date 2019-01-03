import { Component,Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { TabFormComponent } from "../tab-form/tab-form" ;

/**
 * Generated class for the TabLineSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-line-selector',
  templateUrl: 'tab-line-selector.html'
})
export class TabLineSelectorComponent 
{
  private title: string ;
  
  constructor( 
    renderer: Renderer2, 
    el: ElementRef )
  {
    this.title = "*" ;
  }

  ngOnInit()
  {
    if( TabFormComponent.currentTabForm ) TabFormComponent.currentTabForm.addColumn( this.title, 1 ) ;
  }
}
