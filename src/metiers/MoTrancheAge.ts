import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;


export class MoTrancheAge extends MoSqlTable
{

  public id:    number;
  public ageMin:    number;
  public ageMax:    number;
  public libelle:   string;
  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id: null, 
        libelle: null,
        ageMin: null,
        ageMax: null } ) ;
  }

  public getTableName(): string
  {
    return "trancheage_18" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoTrancheAge
  {
    return new MoTrancheAge( data ) ;
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