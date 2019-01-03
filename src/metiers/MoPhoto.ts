import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;

export class MoPhoto extends MoSqlTable
{
  public id: number;
  public nom_photo: string;
  public id_mot: number;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id: null,
        nom_photo: null,
        id_mot: null } ) ;
  }

  public getTableName(): string
  {
    return "photo" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoPhoto
  {
    return new MoPhoto( data ) ;
  }

  beforeInsert( sqlPrd: SqlPrd )
  {
    return sqlPrd.select( "select max(id) as maxId from " + this.getTableName(), [], null, 0, 99999).then( (results)=>
    {
        if( results.rows[0].maxId == "" ) this.id = 1 ;
        else this.id = parseInt(results.rows[0].maxId) + 1 ;
    }) ;
  }

  getFk(){
    return this.id_mot;
  }
}