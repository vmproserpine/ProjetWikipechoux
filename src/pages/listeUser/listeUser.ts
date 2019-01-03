import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoUtilisateur } from '../../metiers/MoUtilisateur' ;
import { ListeFrmSqlModelePage } from '../../tools/liste-frm-sql-modele' ;
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-liste-utilisateurs',
  templateUrl: 'liste-utilisateurs.html',
})
export class ListeUtilisateursPage extends ListeFrmSqlModelePage
{
  private exposants: Array<{id:number,nom:string}> ;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public toastCtrl: ToastController) 
  {
    super( new MoUtilisateur(), navCtrl, navParams, sqlPrd, toastCtrl ) ;

    this.exposants = [] ;
  }

  ngOnInit()
  {
    this.select( "SELECT * FROM UTILISATEURS_18 order by nom", [] ) ;

    //let sql = "select id, nom from EXPOSANTS_18 " ;
    //sql += " where id not in( select idExposant from UTILISATEURS_18)" ;

    let sql = "select id, nom from EXPOSANTS_18 order by nom" ;

    this.sqlPrd.select( sql, [], this.exposants ) ;
  }
}
