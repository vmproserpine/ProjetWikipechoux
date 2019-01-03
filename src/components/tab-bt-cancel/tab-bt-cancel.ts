import { Component, Input } from '@angular/core';
import { MoSqlTable } from "../../tools/MoSqlTable" ;

/**
 * Generated class for the TabBtCancelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-bt-cancel',
  templateUrl: 'tab-bt-cancel.html'
})
export class TabBtCancelComponent 
{
  @Input( "object" ) object: MoSqlTable ;
  @Input() title: string ;

  constructor() 
  {
  }

  ngOnInit()
  {
    if( !this.title ) this.title = "Cancel" ;
  }

  onCancel()
  {
    if( this.object ) this.object.restoreInitialData() ;
  }
}
