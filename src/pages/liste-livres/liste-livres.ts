import { Component, Input } from '@angular/core';
import { IonicPage ,NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'; 
import { ListeSqlModelePage } from '../../tools/liste-sql-modele' ;
import { MoLivre } from '../../metiers/MoLivre' ;
import { SaisieLivrePage } from '../saisie-livre/saisie-livre' ;

@Component({
  selector: 'page-liste-livres',
  templateUrl: 'liste-livres.html'
})

export class ListeLivresPage extends ListeSqlModelePage
{
    @Input() private idExposant: number ;

    constructor(
        public navCtrl: NavController,
        public navParam: NavParams,
        public sqlPrd: RemoteSqlProvider){

            super( new MoLivre(), SaisieLivrePage, navCtrl, navParam, sqlPrd ) ;
    }

    ngOnInit()
    {   
            let select = "SELECT * FROM livre_18 WHERE idExposant =" + this.idExposant + " order by titre" ;

            this.select( select, [] ) ;
    }

    onAfterNewItem( object: MoLivre )
    {
        object.idExposant = this.idExposant ;
        return ListeSqlModelePage.prototype.onAfterNewItem( object ) ;
    }

}