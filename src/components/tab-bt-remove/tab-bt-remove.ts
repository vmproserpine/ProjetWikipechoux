import { Component, Input } from '@angular/core';
import { MoSqlTable } from "../../tools/MoSqlTable" ;
import { RemoteSqlProvider } from "../../providers/remotesql/remotesql" ;
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the TabBtRemoveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-bt-remove',
  templateUrl: 'tab-bt-remove.html'
})
export class TabBtRemoveComponent 
{
  @Input( "object" ) object: MoSqlTable ;
  @Input( "liste" ) liste: Array<MoSqlTable> ;
  @Input() title: string ;

  constructor( 
    private sqlPrd: RemoteSqlProvider, 
    private toastCtrl: ToastController ) 
  {
  }

  ngOnInit()
  {
    if( !this.title ) this.title = "Remove" ;
  }

  onRemove()
  {
    if( this.object )
    {
      this.object.delete( this.sqlPrd ).then((results)=>
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
          if( this.liste && this.object.isDeleted() ) 
          {
            let i = this.liste.indexOf( this.object ) ;
            if( i >= 0 ) this.liste.splice( i, 1 ) ;
          }
        }
      }) ;
    }
  }


}
