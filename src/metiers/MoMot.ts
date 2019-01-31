import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;

export class MoMot extends MoSqlTable
{
  public id: number;
  public nom_mot: string;
  public date_creation : Date;
  public idTheme: number;

  constructor( data: any = null ) 
  {
    if( data ) data.date_creation = new Date( data.date_creation ) ;

    super( (data)? data : {
        id: null,
        nom_mot: null,
        date_creation : null,
        idTheme: null } ) ;
  }

  public getTableName(): string
  {
    return "mot" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoMot
  {
    return new MoMot( data ) ;
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
    return this.idTheme;
  }
}