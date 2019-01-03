import { Injectable } from '@angular/core';
import { SqlPrd, SqlPrdAnswer } from '../../providers/remotesql/sqlprd';

import 'rxjs/add/operator/map';

/*
  Generated class for the RemotesqlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteSqlProvider extends SqlPrd
{
  static webSqlApiUrl: string ;
  static webSqlApiName: string ;
  static webDbName: string ;
  static webDbId: number ;

  //private headers: Headers ;

  constructor() 
  {
    super() ;

    //this.headers = new Headers( {"Content-Type":"application/json"}) ;
    
    if( !RemoteSqlProvider.webSqlApiName ) RemoteSqlProvider.webSqlApiName = "sqlexec.php" ;
    if( !RemoteSqlProvider.webSqlApiUrl ) RemoteSqlProvider.webSqlApiUrl = "http://localhost/bd" ;
    console.log('Hello RemoteSqlProvider Provider webSqlApiUrl: ' + RemoteSqlProvider.webSqlApiUrl + " webSqlApiName: " + RemoteSqlProvider.webSqlApiName ); 
  }

    static setWebSqlApiUrl( url: string )
    {
        RemoteSqlProvider.webSqlApiUrl = url ;
    }

    static setWebDbNameAndId( name: string, id: number )
    {
        RemoteSqlProvider.webDbName = name ;
        RemoteSqlProvider.webDbId = id ;
    }
    
    /**
     * @ngdoc methode
    * @name createPostUrl
    * @param {string} sql SQL request
    * @param {array} pk Array of field names of primary key
    * @return {array} array object with values
    * @return {object} return a promise
    * @description
    * Génère et retourne l'URL à envoyer au WEB service avec la methode POST
    */

    createPostUrl( sql: string, pk: Array<string>, values: Array<any> ): string
    {
        return RemoteSqlProvider.webSqlApiUrl + "/" + RemoteSqlProvider.webSqlApiName ;
    }

/**
  * @ngdoc methode
  * @name createPostData
  * @param {string} sql SQL request
  * @param {array} pk Array of field names of primary key
  * @return {array} array object with values
  * @return {object} return a promise
  * @description
  * Génère et retourne l'objet de donnée à envoyer au WEB service avec la methode POST
  */

  createPostData( sql: string, pk: Array<string>, values: any, lineOffset: number=0, nbLines: number=99999999 ): any
  {
    // Recupere le type de requete SELECT, UPDATE, DELETE ou INSERT

    let data = {
        dbname: RemoteSqlProvider.webDbName,
        dbid: RemoteSqlProvider.webDbId,
        sql: sql,
        lineoffset: lineOffset,
        nblines: nbLines,
        valueStr: "",
        pkStr:""
    };
        
    let sqlType = this.getTypeOfSqlStatement( sql ) ;

    //data.valueStr = JSON.stringify( {prenom:"Mathieu", nom:"MYERE"} ) ;

    // Ajoute dans l'attribut fields les valeurs des attributs de l'objet reférencé par values sous forme d'argument
    if( values && ( sqlType == RemoteSqlProvider.SELECT 
    || sqlType == RemoteSqlProvider.UPDATE 
    || sqlType == RemoteSqlProvider.INSERT ) )
    {
        let dd = {} ;

        for( let fieldName in values )        
        {
            if( fieldName[0] != "$" && typeof values[fieldName] != "function" )
            {
                if( values[fieldName] ) dd[fieldName] = values[fieldName] ;
                else dd[fieldName] = "null" ;
            }
        }
        data.valueStr = JSON.stringify( dd ) ;
    }

    // Ajoute sous forme d'argument dans l'attribut fields les valeurs des attributs de l'objet reférencé par values 
    // qui sont mentionnés par le tableau pk
    if( pk && ( sqlType == RemoteSqlProvider.DELETE || sqlType == RemoteSqlProvider.UPDATE ) )
    {
        let dd = {} ;

        for( let i=0 ; i<pk.length ; i++ )
        {
            if( values[pk[i]] ) dd[pk[i]] = values[pk[i]] ;
            else dd[pk[i]] = "null" ;
        }           
        data.pkStr = JSON.stringify( dd ) ;
    }
    return data ;
  }
  
  sendPostRequest( url: string, data: any ) 
  {
    return new Promise((resolve,reject) =>
    {
        var xhr = new XMLHttpRequest();
        xhr.open( "POST", url ) ;
        
        xhr.onload = function() 
        {
            var r  ;
            try
            {
                var str = xhr.responseText.replace( /\r/g,'') ;
                r = JSON.parse( str ) as SqlPrdAnswer ;
                resolve( r ) ;
            }
            catch( err )
            {
                reject("Parsing error:" + err.message + " dans " + xhr.responseText ) ; 
            }
        };
        
        xhr.onerror = function() 
        {
            reject("Error:" + " dans " + xhr.responseText ) ; 
        };
            
        var formData = new FormData();
        
        for( var attr in data )
        {
            formData.append( attr, data[attr] );
        }
    
        xhr.send(formData);
    }) ;
      
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
        let url = this.createPostUrl( sql, null, bindings ) ;
        let data = this.createPostData( sql, null, bindings ) ;
        
        // Envoie la requete vers le serveur WEB
        return this.sendPostRequest( url, data ).then( (results: SqlPrdAnswer) =>
        {
            if( results.sql )
            {
                return results ;
            }
            else alert( "RemoteSqlPrd.prototype.exec: " + results.error + " dans la requete: " + results.sql ) ;
        },error =>
        {
            console.error( "RemoteSqlPrd.prototype.exec: " + error.message + " on URL: " + url ) ;
        });
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
    select( sql: string, bindings: Array<any>, array: Array<any> = null, offset: number = 0, nblines: number = 999999999  ): any
    {
        var url = this.createPostUrl( sql, null, bindings ) ;
        var data = this.createPostData( sql, null, bindings, offset, nblines ) ;
        
        // Envoie la requete vers le serveur WEB
        return this.sendPostRequest( url, data ).then( (results: SqlPrdAnswer) =>
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
            else alert( "RemoteSqlPrd.select: " + results.error + " dans la requete: " + results.sql ) ;
        }, error =>
        {
            console.error( "RemoteSqlPrd.select: " + error + " on URL: " + url ) ;
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
        let url = this.createPostUrl( sql, null, row ) ;
        let data = this.createPostData( sql, null, row ) ;
                
        // Envoie la requete vers le serveur WEB
        return this.sendPostRequest( url, data ).then( (results: SqlPrdAnswer)=>
        {
            if( results.error && results.sql )
            {
                console.error( "RemoteSqlPrd.prototype.insert: " + results.error + + " dans la requete: " + results.sql ) ;
            }
            return results ;
        }, (error)=>
        {
            console.error( "RemoteSqlPrd.prototype.insert: " + error + " on URL: " + url ) ;
        });    
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
        let sql = this.createSqlUpdateStatement( tableName, pk, row ) ;
        let url = this.createPostUrl( sql, pk, row ) ;
        let data = this.createPostData( sql, pk, row ) ;
    
        // Envoie la requete vers le serveur WEB
        return this.sendPostRequest( url, data ).then((results: SqlPrdAnswer)=>
        {
            if( results.sql )
            {
                return results ;
            }
            else alert( "RemoteSqlPrd.prototype.update: " + results.error + " dans la requete: " + results.sql ) ;
        },(error)=>
        {
            console.error( "RemoteSqlPrd.prototype.update: " + error.message + " on URL: " + url ) ;
        });    
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
        let sql = this.createSqlDeleteStatement( tableName, pk, row ) ;
        let url = this.createPostUrl( sql, pk, row ) ;
        let data = this.createPostData( sql, pk, row ) ;
    
        // Envoie la requete vers le serveur WEB
        return this.sendPostRequest( url, data ).then( (results: SqlPrdAnswer)=>
        {
            if( results.sql )
            {
                return results ;
            }
            else alert( "RemoteSqlPrd.prototype.delete: " + results.error + " dans la requete: " + results.sql ) ;
        }, (error)=>
        {
            console.error( "RemoteSqlPrd.prototype.delete: " + error.message + " on URL: " + url ) ;
        });
            
    }

}
