import { Component,Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { TabColumn } from "../TabColumn" ;
import { TabFormComponent } from "../tab-form/tab-form" ;

/**
 * Generated class for the TabCellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-cell',
  templateUrl: 'tab-cell.html'
})

export class TabCellComponent extends TabColumn
{
  @Input("title") title: string ;

  constructor( protected renderer: Renderer2, protected el: ElementRef ) 
  {
    super() ;
  }

  ngOnInit()
  {
    this.renderer.addClass( this.el.nativeElement, 'cellule' ) ;
    super.setTitle( this.title ) ;
    if( TabFormComponent.currentTabForm ) TabFormComponent.currentTabForm.addColumn( this.title, this.width ) ;
  }
}
