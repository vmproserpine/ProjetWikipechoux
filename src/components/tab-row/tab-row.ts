import { Component,Renderer2, ElementRef, OnInit, Input } from '@angular/core';

/**
 * Generated class for the TabRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-row',
  templateUrl: 'tab-row.html'
})

export class TabRowComponent
{
  constructor( private renderer: Renderer2, private el: ElementRef ) 
  {
  }

  ngOnInit()
  {
    this.renderer.addClass( this.el.nativeElement, 'ligne' ) ;
  }
}
