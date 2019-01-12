import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

import { MoMot } from '../../metiers/MoMot' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutMot',
  templateUrl: 'ajoutMot.html'
})

export class AjoutMot extends FrmSqlModelePage
{
    @Input() private idMot:    number ;

    public object:    MoMot;
    public theme: Array<{id: number, nom_theme: string}> ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoMot() )       

            this.theme = [] ;
            this.sqlPrd.select( "select id, nom_theme from theme order by nom_theme", [], this.theme ) ;        
        }
}