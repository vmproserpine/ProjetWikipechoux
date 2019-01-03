import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

import { MoLivre } from '../../metiers/MoLivre' ;
import { MoTheme } from '../../metiers/MoTheme' ;
import { MoTrancheAge } from '../../metiers/MoTrancheAge' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-saisie-livre',
  templateUrl: 'saisie-livre.html'
})

export class SaisieLivrePage extends FrmSqlModelePage
{
    @Input() private idExposant:    number ;

    public object:    MoLivre;
    public tranchesAge: Array<{id: number, libelle: string}> ;
    public themes: Array<{id: number, libelle: string}> ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoLivre() )

            this.tranchesAge = [] ;
            this.sqlPrd.select( "select id, libelle from trancheage_18 order by id", [], this.tranchesAge ) ;        

            this.themes = [] ;
            this.sqlPrd.select( "select id, libelle from theme_18 order by libelle", [], this.themes ) ;        
        }
}