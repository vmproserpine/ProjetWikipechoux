import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoMot } from '../../metiers/MoMot' ;
import { FrmExposantPage } from '../frm-exposant/frm-exposant' ;
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

/**
 * Generated class for the ListeEquipementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listeMot',
  templateUrl: 'listeMot.html',
})
export class ListeMot extends ListeSqlModelePage
{
  private idMot: number ;
  private nom_mot: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoMot (), FrmExposantPage, navCtrl, navParams, sqlPrd ) ;

    this.idMot = null ;
    this.nom_mot = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM mot order by nom_mot", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idMot ) where += " and id=" + this.idMot ;
    if( this.nom_mot ) where += " and nom_mot like '%" + this.nom_mot + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM mot " + where + " order by nom_mot", [] ) ;
  }

}
