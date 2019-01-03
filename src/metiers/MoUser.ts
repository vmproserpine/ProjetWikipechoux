import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;



export class MoUser extends MoSqlTable
{

  public id_user: number ;
  public login: string;
  public mdp: string ;
  public mail: string;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null, 
        login: null,
        mdp: null,
        mail: null } ) ;
  }

  public getTableName(): string
  {
    return "user" ; 
  }

  public getPk(): Array<string>
  {
    return ["id_user"] ; 
  }

  public clone( data: any = null ): MoUser
  {
    return new MoUser( data ) ;
  }

  beforeInsert( sqlPrd: SqlPrd )
  {
    return sqlPrd.select( "select max(id) as maxId from " + this.getTableName(), [], null, 0, 99999).then( (results)=>
    {
        if( results.rows[0].maxId == "" ) this.id_user = 1 ;
        else this.id_user = parseInt(results.rows[0].maxId) + 1 ;
    }) ;
  }

}