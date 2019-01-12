import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

import { MoThemes } from '../../metiers/MoThemes' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutThemes',
  templateUrl: 'ajoutThemes.html'
})

export class AjoutThemes extends FrmSqlModelePage
{
    @Input() private idT:    number ;

    public object:    MoThemes;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoThemes() )       
        }
}