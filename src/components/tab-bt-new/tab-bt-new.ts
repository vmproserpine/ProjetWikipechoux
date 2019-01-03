import { Component, Input } from '@angular/core';
import { Modele } from "../../tools/Modele" ;
import { MoSqlTable } from "../../tools/MoSqlTable" ;

/**
 * Generated class for the TabBtNewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-bt-new',
  templateUrl: 'tab-bt-new.html'
})
export class TabBtNewComponent 
{
  @Input( "modele" ) modele: MoSqlTable ;
  @Input( "liste" ) liste: Array<Modele> ;
  @Input() title: string ;

  constructor() 
  {
  }

  ngOnInit()
  {
    if( !this.title ) this.title = "New" ;
  }

  onNewItem()
  {
    if( this.modele )
    {
      let object : Modele ;
      object = this.modele.clone() ;
      this.liste.push( object ) ;
    }
  }

}
