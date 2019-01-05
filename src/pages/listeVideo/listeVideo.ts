import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoVideo } from '../../metiers/MoVideo' ;
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
  selector: 'page-listeVideo',
  templateUrl: 'listeVideo.html',
})
export class ListeVideo extends ListeSqlModelePage
{
  private idV: number ;
  private nom_video: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoVideo(), FrmExposantPage, navCtrl, navParams, sqlPrd ) ;

    this.idV = null ;
    // this.nom_video = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM video order by id", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idV ) where += " and id=" + this.idV ;
    //if( this.nom_video ) where += " and nom_video like '%" + this.nom_video + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM video " + where + " order by id", [] ) ;
  }

}
