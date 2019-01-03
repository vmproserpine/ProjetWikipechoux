import {Modele} from '../tools/Modele' ;
import {SqlPrd, SqlPrdAnswer} from '../providers/remotesql/sqlprd' ;

export class MoSqlTable extends Modele
{
  constructor( data: any = null) 
  {
    super( data ) ;
    if( !this.isPkValid() ) this.setNew() ;
  }

  public getTableName(): string
  {
    return ""
  }

  public getPk(): Array<string>
  {
    return [] ;
  }

  public isPkValid()
  {
    let pk = this.getPk() ;
    for( let i=0 ; i<pk.length ; i++ ) if( !this[pk[i]] ) return false ;
    return true ;
  }

  save( sqlPrd: SqlPrd )
  {
    let tableName = this.getTableName() ;
    let pk = this.getPk() ;

    if( tableName == "" ) console.error( "MoSqlTable.save: table not define, you should redefine method getTableName in your modele class" ) ;
    if( !pk.length ) console.error( "MoSqlTable.save: pk not define, you should redefine method getPk in your modele class" ) ;

    if( !this.isNew() )
    {
      return sqlPrd.update( tableName, pk, this ).then((results)=>
      {
        if( !results.error ) this.resetState() ;
        return results ;
      }) ;
    }
    else
    {
      return this.beforeInsert( sqlPrd ).then( ()=>
      {
        return sqlPrd.insert( tableName, this ) ;
      }).then( (results)=>
      {
        if( !results.error ) this.resetState() ;
        return results ;
      }) ;
    }
  }

  delete( sqlPrd: SqlPrd )
  {
    let tableName = this.getTableName() ;
    let pk = this.getPk() ;

    if( tableName == "" ) console.error( "MoSqlTable.delete: table not define, you should redefine method getTableName in your modele class" ) ;
    if( !pk.length ) console.error( "MoSqlTable.delete: pk not define, you should redefine method getPk in your modele class" ) ;

    return sqlPrd.delete( tableName, pk, this ).then( (results)=>
    {
      if( !results.error ) this.setDeleted() ;
      return results ;
    }) ;
  }

  load( sqlPrd: SqlPrd, pkObject: any )
  {
    let tableName = this.getTableName() ;
    let pk = this.getPk() ;

    if( tableName == "" ) console.error( "MoSqlTable.load: table not define, you should redefine method getTableName in your modele class" ) ;
    if( !pk.length ) console.error( "MoSqlTable.load: pk not define, you should redefine method getPk in your modele class" ) ;

    // Cree la clause where à partir de la cle primaire
    let where = sqlPrd.createSqlWhereStatement( pk ) ;
    let pkValues = [] ;
    pk.forEach( (field)=>
    {
      pkValues.push( pkObject[field] ) ;
    }) ;

    let sql = "select * from " + tableName + " " + where ;

    return sqlPrd.select( sql, pkValues, null, 0, 9999999 ).then( (results)=>
    {
      if( !results.error ) 
      {
        if( results.rows.length )
        {
          for( let field in results.rows[0] )
          {
            this[field] = results.rows[0][field] ;
          }
        }
      }
      this.resetState() ;
      return this ;
    }) ;
  }

  beforeInsert( sqlPrd: SqlPrd )
  {
    return new Promise( (resolve, reject)=>
    {
      resolve() ;
    }) ;
  }
}