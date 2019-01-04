import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoAnnexe } from '../../metiers/MoAnnexe' ;
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
  selector: 'page-listeAnnexe',
  templateUrl: 'listeAnnexe.html',
})
export class ListeAnnexe extends ListeSqlModelePage
{
  private idA: number ;
  private annexe_mot: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoAnnexe(), FrmExposantPage, navCtrl, navParams, sqlPrd ) ;

    this.idA = null ;
    this.annexe_mot = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM annexe order by annexe_mot", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idA ) where += " and id=" + this.idA ;
    if( this.annexe_mot ) where += " and mot like '%" + this.annexe_mot + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM annexe " + where + " order by annexe_mot", [] ) ;
  }

}
