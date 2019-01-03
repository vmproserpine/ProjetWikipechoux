import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the ListeFrmLineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'liste-frm-line',
  templateUrl: 'liste-frm-line.html'
})
export class ListeFrmLineComponent 
{
  @Input() object: any ;
  @Output() onLineCancel = new EventEmitter<any>() ;

  public liste: Array<any> ;

  constructor() 
  {
    this.liste = [
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"},
      {prenom:"Toto", nom:"MOU"}
    ];
  }

  onCancel()
  {
    this.onLineCancel.emit( this.object ) ;
  }

}
