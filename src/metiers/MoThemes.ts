import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;


export class MoThemes extends MoSqlTable
{

  public id:        number;
  public nom_theme:   string;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null,
        nom_theme:null } ) ;
  }

  public getTableName(): string
  {
    return "theme" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoThemes
  {
    return new MoThemes( data ) ;
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