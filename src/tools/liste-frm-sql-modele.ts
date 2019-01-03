import { NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../providers/remotesql/remotesql';
import { Modele } from '../tools/Modele' ;
import { ToastController } from 'ionic-angular';
import { MoSqlTable } from './MoSqlTable';
import { ListeSqlModelePage } from './liste-sql-modele' ;

export class ListeFrmSqlModelePage extends ListeSqlModelePage
{
  constructor( 
    modeleObject: Modele,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public toastCtrl: ToastController ) 
  {
    super( modeleObject, null, navCtrl, navParams, sqlPrd ) ;
  }

  onBeforeSave( object: MoSqlTable )
  {
    return true ;    
  }

  onAfterSave( object: MoSqlTable )
  {
    return true ;    
  }

  onLineCancel( object: MoSqlTable )
  {
    this.onCancel( object ) ;
  }

  onCancel( object: MoSqlTable )
  {
    object.restoreInitialData() ;
  }

  onSave( object: MoSqlTable )
  {
    this.onBeforeSave( object ) ;
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
      this.onAfterSave( object ) ;
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
