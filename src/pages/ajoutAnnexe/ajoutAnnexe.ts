import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;


import { MoAnnexe } from '../../metiers/MoAnnexe' ;
import { MoMot } from '../../metiers/MoMot' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutAnnexe',
  templateUrl: 'ajoutAnnexe.html'
})

export class AjoutAnnexe extends FrmSqlModelePage
{
    @Input() private idA:    number ;

    public object:    MoAnnexe;
    // public mot: Array<{id: number, nom_mot: string}> ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoAnnexe() )

           // this.mot = [] ;
            // this.sqlPrd.select( "select id, nom_mot from mot order by id", [], this.mot ) ;                
        }
}