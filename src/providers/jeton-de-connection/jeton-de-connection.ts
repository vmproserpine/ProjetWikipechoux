import { Injectable } from '@angular/core';
import { RemoteSqlProvider } from "../../providers/remotesql/remotesql" ;

import 'rxjs/add/operator/map';

@Injectable()
export class JetonDeConnectionProvider 
{
  private connected: boolean ;
  //private compte: string ;
  private login: string ;
  //private privilege: number ;
  private id: number ;
  //private idExposant: number ;

  constructor( public sqlPrd: RemoteSqlProvider ) 
  {
    this.connected = false ;
    //this.compte = null ;
    this.login = null ;
    //this.privilege = 0 ;
    this.id = null ;
    // this.idExposant = null ;
  }

  /*getPrivilege() : number
  {
    return this.privilege ;
  }*/

  getNom(): string
  {
    return this.login ;
  }

  /*getIdExposant(): number
  {
    return this.idExposant ;
  }*/

  connect( login: string, mdp: string ): Promise<any>
  {
    return this.sqlPrd.select( "select login, id_user from user where login=? and mdp=?",
      [login,mdp] ).then( (data)=>
      {
        if( data.rows.length > 0 )
        {
          //this.compte = compte ;
          this.login = data.rows[0].login ;
          //this.privilege = parseInt( data.rows[0].privilege ) ;
          this.id = parseInt( data.rows[0].id ) ;
          //this.idExposant = parseInt( data.rows[0].idExposant ) ;
          this.connected = true ;
          return true ;
        }
        else return false ;
      }) ;
  }

  unConnect()
  {
    //this.compte = null ;
    this.login = null ;
    //this.privilege = null ;
    this.id = null ;
    //this.idExposant = null ;
    this.connected = false ;
  }

}
