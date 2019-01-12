import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;


import { MoMadeleine } from '../../metiers/MoMadeleine' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutMadeleine',
  templateUrl: 'ajoutMadeleine.html'
})

export class AjoutMadeleine extends FrmSqlModelePage
{
    @Input() private idM:    number ;

    public object:    MoMadeleine;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoMadeleine() )      
        }
}