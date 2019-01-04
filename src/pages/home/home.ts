import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JetonDeConnectionProvider } from "../../providers/jeton-de-connection/jeton-de-connection" ; 
import { ToastController } from 'ionic-angular';
import { FrmExposantPage } from '../frm-exposant/frm-exposant' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  private compte: string ;
  private mdp: string ;
  private privilege: number ;

  constructor(
    public navCtrl: NavController,
    public jetonConnect: JetonDeConnectionProvider,
    public toastCtrl: ToastController ) 
  {
    this.privilege = 0 ;
  }

  onConnecter()
  {
    this.jetonConnect.connect( this.compte, this.mdp ).then( (result)=>
    {
      let message = "Compte ou mot de passe incorrect" ;
      if( result > 0 ) message = "Connection réussie: " + this.jetonConnect.getNom() ;
      else 
      {
        this.compte = null ;
        this.mdp = null ;
      }
      
      let toast = this.toastCtrl.create( {
        message: message,
        duration: 3000
      }) ;
      toast.present() ;

      if( this.jetonConnect.getIdExposant() )
      {
        this.navCtrl.push( FrmExposantPage, { pk: {id: this.jetonConnect.getIdExposant() } } ) ;
      }
    }) ;
  }
}
