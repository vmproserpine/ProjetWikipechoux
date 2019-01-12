import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

import { MoLivre } from '../../metiers/MoLivre' ;
import { MoTheme } from '../../metiers/MoTheme' ;
import { MoTrancheAge } from '../../metiers/MoTrancheAge' ;
import { MoPhoto } from '../../metiers/MoPhoto' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutPhoto',
  templateUrl: 'ajoutPhoto.html'
})

export class AjoutPhoto extends FrmSqlModelePage
{
    @Input() private idP:    number ;

    public object:    MoPhoto;
    public mot: Array<{id: number, nom_mot: string}> ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoPhoto() )        
            this.mot = [] ;
            this.sqlPrd.select( "select id, nom_mot from mot order by nom_mot", [], this.mot ) ;        
        }
}