import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;

import { MoVideo } from '../../metiers/MoVideo' ;

import { FrmSqlModelePage } from '../../tools/frm-sql_modele' ;
 

@Component({
  selector: 'page-ajoutVideo',
  templateUrl: 'ajoutVideo.html'
})

export class AjoutVideo extends FrmSqlModelePage
{
    @Input() private idV:    number ;

    public object:    MoVideo;
    public mot: Array<{id: number, nom_mot: string}> ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public sqlPrd: RemoteSqlProvider  )
        {
            super( navCtrl, navParams, sqlPrd, toastCtrl, new MoVideo() )

            this.mot = [] ;
            this.sqlPrd.select( "select id, nom_mot from mot order by nom_mot", [], this.mot ) ;              
        }
}