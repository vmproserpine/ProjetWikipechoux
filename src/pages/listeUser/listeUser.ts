import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoUser } from '../../metiers/MoUser' ;
import { ListeFrmSqlModelePage } from '../../tools/liste-frm-sql-modele' ;
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-listeUser',
  templateUrl: 'listeUser.html',
})
export class ListeUser extends ListeFrmSqlModelePage
{
  private user: Array<{id_user:number,login:string}> ;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public toastCtrl: ToastController) 
  {
    super( new MoUser(), navCtrl, navParams, sqlPrd, toastCtrl ) ;

    this.user = [] ;
  }

  ngOnInit()
  {
    this.select( "SELECT * FROM user order by login", [] ) ;

    //let sql = "select id, nom from EXPOSANTS_18 " ;
    //sql += " where id not in( select idExposant from UTILISATEURS_18)" ;

    //let sql = "select id, nom from EXPOSANTS_18 order by nom" ;

    //this.sqlPrd.select( sql, [], this.user ) ;
  }
}
