import { NavController, NavParams } from 'ionic-angular';
import { MoSqlTable } from '../tools/MoSqlTable' ;
import { RemoteSqlProvider } from '../providers/remotesql/remotesql';
import { ToastController } from 'ionic-angular';


export class FrmSqlModelePage 
{
  public object: MoSqlTable ;
  protected modeleObject: MoSqlTable ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public toastCtrl: ToastController,
    modeleObject: MoSqlTable = null ) 
  {
    this.modeleObject = modeleObject ;
    this.object = this.navParams.get( "object" ) ;
    if( !this.object && this.modeleObject )
    {
      this.object = this.modeleObject ;
      let pk = this.navParams.get( "pk" ) ;
      if( pk ) this.modeleObject.load( this.sqlPrd, pk ).then( (object)=>
      {
        this.object = object ;
        this.onObjectLoaded() ;
      }) ;
    }
  }

  onObjectLoaded()
  {

  }

  onCancel()
  {
    this.navCtrl.pop() ;
  }

  onSave()
  {
    this.object.save( this.sqlPrd ).then((results)=>
    {
      if( !results.error ) this.navCtrl.pop() ;
      else 
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

  onRemove()
  {
    this.object.delete( this.sqlPrd ).then((results)=>
    {
      if( !results.error ) this.navCtrl.pop() ;
      else 
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
