import {MoSqlTable } from '../tools/MoSqlTable' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;


export class MoLivre extends MoSqlTable
{

  public id: number ;
  public titre: string ;
  public enResume: string ;
  public auteur: string ;
  public editeur: string ;
  public idExposant:number ;
  public idTrangeAge: number ;
  public image: string ;
  public commentaire: string ;

  constructor( data: any = null ) 
  {
    super( (data)? data : {
        id:null, 
        titre: null,
        enResume: null,
        editeur: null,
        auteur: null,
        image: null,
        commentaire: null,
        idTrancheAge: null,
        idExposant:null } ) ;
  }

  public getTableName(): string
  {
    return "livre_18" ; 
  }

  public getPk(): Array<string>
  {
    return ["id"] ; 
  }

  public clone( data: any = null ): MoLivre
  {
    return new MoLivre( data ) ;
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