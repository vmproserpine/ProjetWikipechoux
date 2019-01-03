import { Injectable } from '@angular/core';
import { RemoteSqlProvider } from "../../providers/remotesql/remotesql" ;

import 'rxjs/add/operator/map';

@Injectable()
export class JetonDeConnectionProvider 
{
  private connected: boolean ;
  private compte: string ;
  private nom: string ;
  private privilege: number ;
  private id: number ;
  private idExposant: number ;

  constructor( public sqlPrd: RemoteSqlProvider ) 
  {
    this.connected = false ;
    this.compte = null ;
    this.nom = null ;
    this.privilege = 0 ;
    this.id = null ;
    this.idExposant = null ;
  }

  getPrivilege() : number
  {
    return this.privilege ;
  }

  getNom(): string
  {
    return this.nom ;
  }

  getIdExposant(): number
  {
    return this.idExposant ;
  }

  connect( compte: string, password: string ): Promise<any>
  {
    return this.sqlPrd.select( "select nom, privilege, id, idExposant from UTILISATEURS_18 where compte=? and mdp=?",
      [compte,password] ).then( (data)=>
      {
        if( data.rows.length > 0 )
        {
          this.compte = compte ;
          this.nom = data.rows[0].nom ;
          this.privilege = parseInt( data.rows[0].privilege ) ;
          this.id = parseInt( data.rows[0].id ) ;
          this.idExposant = parseInt( data.rows[0].idExposant ) ;
          this.connected = true ;
          return true ;
        }
        else return false ;
      }) ;
  }

  unConnect()
  {
    this.compte = null ;
    this.nom = null ;
    this.privilege = null ;
    this.id = null ;
    this.idExposant = null ;
    this.connected = false ;
  }

}
