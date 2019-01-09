import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoMadeleine } from '../../metiers/MoMadeleine' ;
import {AjoutMadeleine} from '../ajoutMadeleine/ajoutMadeleine' ;
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

/**
 * Generated class for the ListeEquipementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listeMadeleine',
  templateUrl: 'listeMadeleine.html',
})
export class ListeMadeleine extends ListeSqlModelePage
{
  private idM: number ;
  private image: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoMadeleine(), AjoutMadeleine, navCtrl, navParams, sqlPrd ) ;

    this.idM = null ;
    this.image = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM madeleine order by id", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idM ) where += " and id=" + this.idM ;
    //if( this.rNom ) where += " and nom like '%" + this.rNom + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM madeleine " + where + " order by id", [] ) ;
  }

}
