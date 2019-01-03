import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;

export class MoAnnexe extends MoSqlTable
{
  public id: number;
  public annexe_mot: string;
  public annexe_def: string;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id: null,
        annexe_mot: null, 
        annexe_def: null} ) ;
  }

  public getTableName(): string
  {
    return "annexe" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoAnnexe
  {
    return new MoAnnexe( data ) ;
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