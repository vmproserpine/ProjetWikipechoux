import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;



export class MoUtilisateur extends MoSqlTable
{

  public id: number ;
  public nom: string ;
  public compte: string ;
  public mdp: string ;
  public privilege: number ;
  public idExposant: number ;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null, 
        idExposant: null,
        nom: null,
        compte: null,
        mdp: null, 
        privilege: 0 } ) ;
  }

  public getTableName(): string
  {
    return "UTILISATEURS_18" ; 
  }

  public getPk(): Array<string>
  {
    return ["nom"] ; 
  }

  public clone( data: any = null ): MoUtilisateur
  {
    return new MoUtilisateur( data ) ;
  }

  beforeInsert( sqlPrd: SqlPrd )
  {
    return sqlPrd.select( "select max(id) as maxId from " + this.getTableName(), [], null, 0, 99999).then( (results)=>
    {
        if( results.rows[0].maxId == "" ) this.id = 1 ;
        else this.id = parseInt(results.rows[0].maxId) + 1 ;
    }) ;
  }

}