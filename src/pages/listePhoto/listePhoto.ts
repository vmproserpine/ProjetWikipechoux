import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoPhoto } from '../../metiers/MoPhoto' ;
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
  selector: 'page-listePhoto',
  templateUrl: 'listePhoto.html',
})
export class ListePhoto extends ListeSqlModelePage
{
  private rId: number ;
  private rNom: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoPhoto(), FrmExposantPage, navCtrl, navParams, sqlPrd ) ;

    this.rId = null ;
    this.rNom = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM EXPOSANTS_18 order by nom", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.rId ) where += " and id=" + this.rId ;
    if( this.rNom ) where += " and nom like '%" + this.rNom + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM EXPOSANTS_18 " + where + " order by nom", [] ) ;
  }

}
