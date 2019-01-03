import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SqlPrd, SqlPrdAnswer } from '../../providers/remotesql/sqlprd';
import { BrowserModule } from '@angular/platform-browser';

import 'rxjs/add/operator/map';

/*
  Generated class for the WebsqlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSqlProvider extends SqlPrd
{
  static webDbName: string = "myDB";
  static webDbVersion: string = "1.0" ;
  static webDbComment: string = "" ;
  static webDbSize: number = 1000 * 1024 ;
  static webDbId: number = 1 ;
  static webDbInitFct: any = null ;
  
  private headers: Headers ;

  private db: any ;

  constructor( public http: HttpClient ) 
  {
    super() ;

    this.headers = new Headers( {"Content-Type":"application/json"}) ;
    
    console.log('WebSqlProvider Provider dbName: ' + WebSqlProvider.webDbName + " version: " + WebSqlProvider.webDbVersion ); 

    // Ouvre ou crée la base de données locale de type WEBSQL.
    this.db = (<any>window).openDatabase( 
      WebSqlProvider.webDbName, 
      WebSqlProvider.webDbVersion, 
      WebSqlProvider.webDbComment, 
      WebSqlProvider.webDbSize ) ;    

      if( WebSqlProvider.webDbInitFct ) WebSqlProvider.webDbInitFct( this ) ;
  }

    static setWebSql( dbName: string, dbVersion: string, dbComment: string, dbSize: number, initFct: any = null )
    {
      WebSqlProvider.webDbName = dbName ;
      WebSqlProvider.webDbVersion = dbVersion ;
      WebSqlProvider.webDbComment = dbComment ;
      WebSqlProvider.webDbSize = dbSize ;
      WebSqlProvider.webDbInitFct = initFct ;
    }

    
    /**
     * @ngdoc method
    * @name sendSql
    * @param {string} sql SQL request
    * @param {array} sql array of SQL string request
    * @return {object} Return a promise
    * @description
    * Execute a SQL request or a array of SQL request
    */
    sendSql( sql: string, bindings: Array<string> ): any
    {
      return new Promise((resolve,reject) =>
      {
        this.db.transaction( function( transaction ) 
        {
            // Envoie la requete SQL à WEBSQL
            transaction.executeSql( sql, bindings, 
                function( transaction, results )
                {
                    // Declenche un traitement de succes
                    resolve( results ) ;
                },
                function( transaction, error )
                {
                    // Declenche un traitement d'erreur
                    reject( "Error: " + error.code + " " + error.message ) ;
                }
            );
        });
      });
    }
      
    /**
     * @ngdoc method
    * @name SqlPrd.exec
    * @param {string} sql SQL request
    * @param {array} sql array of SQL string request
    * @return {object} Return a promise
    * @description
    * Execute a SQL request or a array of SQL request
    */
    exec( sql: string, bindings: Array<string> ): any
    {
      return this.sendSql( sql, bindings ) ;
    }
  
    /**
    * @ngdoc method
    * @name select
    * @param {string} sql SQL request
    * @param {array} bindings Array of values for bindings
    * @return {array} array populated with rows. Each row contain an objet with valuated attributes for each field in SQL select
    * @return {object} return a promise
    * @description
    * Execute a SQL request and return the result as an array of objects
    */
    select( sql: string, bindings: Array<any>, array: Array<any> = null ): any
    {        
        // Envoie la requete vers WebSql
        return this.sendSql( sql, bindings ).then( (results: SqlPrdAnswer) =>
        {
            if( results.rows )
            {
                if( array ) 
                {
                    //Insere les lignes résultats dans le tableau array
                    for( let i = 0; i < results.rows.length; i++ ) 
                    {
                        array.push(results.rows[i]) ;
                    }                                
                    return results ;
                }
                else return results ;
            }
            else alert( "WebSqlProvider.select: " + results.error + " dans la requete: " + results.sql ) ;
        }, error =>
        {
            console.error( "WebSqlProvider.select: " + error ) ;
        });    
    }

    /**
    * @ngdoc method
    * @name createTable
    * @param {string} tableName SQL name of the table
    * @param {object} fields Object witch each attribute is a table's field. 
    * @return {object} return a promise
    * @description
    * Create a new table if not exist
    */
    createTable( tableName: string, fields: Array<string> ): any
    {
      var sql = this.createSqlCreateTableStatement( tableName, fields ) ;
      return this.exec( sql, [] ) ;
    }

    /**
    * @ngdoc method
    * @name insert
    * @param {string} tableName SQL name of the table
    * @param {object} row Object witch each attribute content a value for table's field. 
    * @return {object} return a promise
    * @description
    * Insert a new record
    */
    insert( tableName: string, row: any ): any
    {
      let sql = this.createSqlInsertStatement( tableName, row ) ;

        // Liste des valeurs de bindings
      let bindings = [] ;
      for( var fieldName in row )
      {
          bindings.push( row[fieldName] ) ;
      }
      return this.exec( sql, bindings ) ;
    }

    /**
    * @ngdoc method
    * @name update
    * @param {string} tableName SQL name of the table
    * @param {object} row Object witch each attribute content a value for table's field. 
    * @param {object} pk array witch each case content field name of primary key. 
    * @return {object} return a promise
    * @description
    * Update a record
    */
    update( tableName: string, pk: any, row: any ): any
    {
      var sql = this.createSqlUpdateStatement( tableName, pk, row ) ;
      
      // Liste des valeurs de bindings
      var bindings = [] ;

      // Valeurs de mise a jour
      for( var fieldName in row )
      {
          bindings.push( row[fieldName] ) ;
      }

      // Valeurs de la cle primaire
      for( var i=0 ; i<pk.length ; i++ )
      {
          bindings.push( row[pk[i]] ) ;
      }
      return this.exec( sql, bindings ) ;
    }

    /**
    * @ngdoc method
    * @name delete
    * @param {string} tableName SQL name of the table
    * @param {object} row Object witch each attribute content a value for table's field. 
    * @param {object} pk array witch each case content field name of primary key. 
    * @return {object} return a promise
    * @description
    * Delete a record
    */
    delete( tableName: string, pk: any, row: any ): any
    {
      var sql = this.createSqlDeleteStatement( tableName, pk, row ) ;
      
      // Liste des valeurs de bindings
      var bindings = [] ;

      // Valeurs de la cle primaire
      for( var i=0 ; i<pk.length ; i++ )
      {
          bindings.push( row[pk[i]] ) ;
      }

      return this.exec( sql, bindings ) ;
    }

}

