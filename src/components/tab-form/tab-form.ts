import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { TabRowComponent } from "../tab-row/tab-row" ;
/**
 * Generated class for the TabFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-form',
  templateUrl: 'tab-form.html'
})

export class TabFormComponent
{
  @Input() title: string ;

  private columns: Array<any> ;

  public static currentTabForm: TabFormComponent ;

  constructor( private renderer: Renderer2, private el: ElementRef ) 
  {
    TabFormComponent.currentTabForm = this ;
    this.columns = [] ;
  }

  public addColumn( title: string, width: number )
  {
    if( !this.findColumnByTitle( title ) )
      this.columns.push( {title: title, minWidth: width } ) ;
  }

  public findColumnByTitle( title: string ): any
  {
    for( let i=0; i<this.columns.length; i++ )
    {
      if( this.columns[i].title == title ) return this.columns[i] ;
    }
    return null ;
  }

  ngOnInit()
  {
  }
}
