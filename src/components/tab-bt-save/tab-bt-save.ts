import { Component, Input } from '@angular/core';
import { MoSqlTable } from "../../tools/MoSqlTable" ;
import { RemoteSqlProvider } from "../../providers/remotesql/remotesql" ;
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the TabBtSaveComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-bt-save',
  templateUrl: 'tab-bt-save.html'
})

export class TabBtSaveComponent 
{
  @Input( "object" ) object: MoSqlTable ;
  @Input() title: string ;

  constructor( 
    private sqlPrd: RemoteSqlProvider, 
    private toastCtrl: ToastController ) 
  {
  }

  ngOnInit()
  {
    if( !this.title ) this.title = "Save" ;
  }

  onSave()
  {
    if( this.object )
    {
      this.object.save( this.sqlPrd ).then((results)=>
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
  }
}
