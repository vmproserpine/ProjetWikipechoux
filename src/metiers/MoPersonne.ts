import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;

export class MoPersonne extends MoSqlTable
{

  public id: number ;
  public nom: string ;
  public prenom:string ;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null, 
        nom: null,
        prenom:null } ) ;
  }

  public getTableName(): string
  {
    return "personne_18" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoPersonne
  {
    return new MoPersonne( data ) ;
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