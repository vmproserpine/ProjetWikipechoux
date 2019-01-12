import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { MoThemes } from '../../metiers/MoThemes' ;
import {AjoutThemes} from '../ajoutThemes/ajoutThemes' ;
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

/**
 * Generated class for the ListeEquipementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listeThemes',
  templateUrl: 'listeThemes.html',
})
export class ListeThemes extends ListeSqlModelePage
{
  private idT: number ; 
  private nom_theme: string ;

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
    super( new MoThemes(), AjoutThemes, navCtrl, navParams, sqlPrd ) ;

    this.idT = null ;
    this.nom_theme = null ;
  }

  ngOnInit()
  {
    this.select( "SELECT DISTINCT * FROM theme order by nom_theme", [] ) ;
  }

  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.idT ) where += " and id=" + this.idT ;
    if( this.nom_theme ) where += " and nom_theme like '%" + this.nom_theme + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM theme " + where + " order by nom_theme", [] ) ;
  }

}
