import { Component, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { Modele } from '../../tools/Modele' ;
import { MoSqlTable } from '../../tools/MoSqlTable' ;
//import { ListeFrmSqlModelePage } from '../../tools/liste-frm-sql-modele' ;
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the ListeFrmSqlModeleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'liste-frm-sql-modele',
  templateUrl: 'liste-frm-sql-modele.html'
})

export class ListeFrmSqlModeleComponent
{
  @Input() liste: Array<any> ;

  public nom: String ;
  public prenom: String ;
  public object: any ;

  protected modeleObject: Modele ;
  public sqlPrd: RemoteSqlProvider ;
  public toastCtrl: ToastController ; 

  constructor( private renderer: Renderer2, private el: ElementRef )
  {
    this.nom = "NOM" ;
    this.prenom = "PRENOM" ;
  }

  ngOnInit()
  {
    //this.renderer.addClass( this.el.nativeElement, 'Toto' ) ;
    let str = `<table class=\"tab\">
    <thead>
      <tr class=\"tab-header\">
        <td class="col-header">A</td>
        <td class="col-header">B</td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let p of liste; let even = even; let odd = odd"  [ngClass]="{'tab-row-odd': odd,'tab-row-even': even}">
        
          <td class="cell cell-text">{{even}}</td>
          <td class="cell cell-text">{{odd}}</td>
          <td class="cell cell-text">{{p.prenom}}</td>
          <td class="cell cell-text">{{p.nom}}</td>
          <td class="cell cell-text"><input type="text" [(ngModel)]="p.prenom"></td>
          <td class="cell cell-text"><input type="text" [(ngModel)]="p.nom"></td>      
        
      </tr>
    </tbody>
  </table>`
    //this.el.nativeElement.innerHTML = str ;

    /*
    let table: ElementRef = this.renderer.createElement( "table") ;
    this.renderer.addClass( table, "tab" ) ;
    this.renderer.appendChild( this.el.nativeElement, table ) ;

    let thead: ElementRef = this.renderer.createElement( "thead" ) ;
    this.renderer.appendChild( table, thead ) ;

    let tr: ElementRef = this.renderer.createElement( "tr" ) ;
    this.renderer.addClass( tr, "tab-header") ;
    this.renderer.appendChild( thead, tr ) ;

    let td: ElementRef = this.renderer.createElement( "td" ) ; 
    this.renderer.addClass( td, "col-header") ;
    this.renderer.appendChild( tr, td ) ;

    let txt: ElementRef = this.renderer.createText( "{{nom}}" ) ;
    this.renderer.appendChild( td, txt ) ;

    td = this.renderer.createElement( "td" ) ; 
    this.renderer.addClass( td, "col-header") ;
    this.renderer.appendChild( tr, td ) ;

    txt = this.renderer.createText( "{{prenom}}" ) ;
    this.renderer.appendChild( td, txt ) ;
    */
  }

  init( modeleObject: Modele, sqlPrd: RemoteSqlProvider, toastCtrl: ToastController )
  {
    this.modeleObject = modeleObject ;
    this.sqlPrd = sqlPrd ;
    this.toastCtrl = toastCtrl ;
  }

  clear()
  {
    this.liste = [] ;
  }

  select( sql: string, bindings: Array<any> )
  {
    this.sqlPrd.select( sql, bindings ).then( (data)=>
    {
      data.rows.forEach( (object) => 
      {
        this.liste.push( this.modeleObject.clone( object ) ) ;  
      }); 
    });

  }

  onNewItem()
  {
    let object = this.modeleObject.clone() ;
    this.liste.push( object ) ;
  }

  addStringFilter( where: string, fieldName: string, values: Array<string> )
  {
    if( values.length )
    {
      where += " and " + fieldName + " in(\'" + values[0] + "\'" ;
      for( let i=1 ; i<values.length ; i++ ) where += ",\'" + values[i] + "\'" ;
      where += ")" ;
    }
    return where ;
  }

  addNumberFilter( where: string, fieldName: string, values: Array<number> )
  {
    if( values.length )
    {
      where += " and " + fieldName + " in(" + values[0] ;
      for( let i=1 ; i<values.length ; i++ ) where += "," + values[i]  ;
      where += ")" ;
    }
    return where ;
  }


  onCancel( object: MoSqlTable )
  {
    object.restoreInitialData() ;
  }

  onSave( object: MoSqlTable )
  {
    object.save( this.sqlPrd ).then((results)=>
    {
      if( results.error ) 
      {
        let toast = this.toastCtrl.create({
          message: results.error,
          duration: 3000,
          position: 'top'
        });
        toast.present() ;
      }
    }) ;
  }

  onRemove( object: MoSqlTable )
  {
    object.delete( this.sqlPrd ).then((results)=>
    {
      if( results.error )
      {
        let toast = this.toastCtrl.create({
          message: results.error,
          duration: 3000,
          position: 'top'
        });
        toast.present() ;
      }
      else
      {
        if( object.isDeleted() ) 
        {
          let i = this.liste.indexOf( object ) ;
          if( i >= 0 ) this.liste.splice( i, 1 ) ;
        }
      }
    }) ;
  }

}
