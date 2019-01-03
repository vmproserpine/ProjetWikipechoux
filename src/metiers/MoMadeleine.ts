import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;


export class MoMadeleine extends MoSqlTable
{

  public id: number ;
  public libelle: string ;
  public image: string ;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null, 
        libelle: null,
        image: null,
         } ) ;
  }

  public getTableName(): string
  {
    return "madeleine" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoMadeleine
  {
    return new MoMadeleine( data ) ;
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