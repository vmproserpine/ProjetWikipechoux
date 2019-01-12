import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoPhoto } from '../../metiers/MoPhoto' ;
import {AjoutPhoto} from '../ajoutPhoto/ajoutPhoto' ;
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
  private idP: number ;
  private nom_photo: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoPhoto(), AjoutPhoto, navCtrl, navParams, sqlPrd ) ;

    this.idP = null ;
    this.nom_photo = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM photo order by id", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idP ) where += " and id=" + this.idP ;
    if( this.nom_photo ) where += " and nom_photo like '%" + this.nom_photo + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM photo " + where + " order by id", [] ) ;
  }

}
