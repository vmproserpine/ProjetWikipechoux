import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

import { MoUtilisateur } from '../../metiers/MoUtilisateur' ;
import { MoPersonne } from '../../metiers/MoPersonne' ;
import { MoRendezVous } from '../../metiers/MoRendezVous' ;

import { SaisieRDVPage } from "../saisie-RDV/saisieRDV";
import { ListeSqlModelePage } from "../../tools/liste-sql-modele";

@IonicPage()
@Component({
  selector: 'page-ListeRDV',
  templateUrl: 'ListeRDV.html',
})
export class ListeRDVPage extends ListeSqlModelePage
{
  @Input() private idExposant: number ;

  private rdv: Array<{id:number,nom:string, nbPlacesMax:number, jour:string, duree:number, heure:string, idExposant:number, idStand:number, idTrancheAge:number}>;
  private lesPersonnes: Array<{id:number,nom:string, prenom:string, fonction:string}>;
  private rId: number ;
  private rNom: string ;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) 
  {
     super( new MoRendezVous(), SaisieRDVPage, navCtrl, navParams, sqlPrd )

    this.rdv = [] ;
    this.lesPersonnes=[];
  }
  ngOnInit()
  {
    /*this.select("SELECT * FROM participer_18 order by idPersonne",[]);
    let lesPersonnes = "select id "; */


    this.select( "SELECT DISTINCT * FROM rdv_18 order by id", [] ) ;

    //let sql = "select id, nom from EXPOSANTS_18 " ;
    //sql += " where id not in( select idExposant from UTILISATEURS_18)" ;

    let sql = "select DISTINCT r.id, r.nom, r.nbMaxPlace, r.jour, r.duree, r.heure from rdv_18 r order by r.id" ;

    this.sqlPrd.select( sql, [], this.rdv );
  }
  onFiltre()
  {
    let where = "where 1=1" ;

    if( this.rId ) where += " and idStand=" + this.rId ;
    if( this.rNom ) where += " and nom like '%" + this.rNom + "%'" ;

    this.liste = [] ;
    this.select( "SELECT DISTINCT * FROM rdv_18 " + where + " order by id", [] ) ;
  }
}