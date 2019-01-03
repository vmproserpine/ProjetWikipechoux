
/**
 * 
 * @class SqlPrd
 * @constructor
 * @description Classe mère pour un fournisseur d'acces SQL
 */
export abstract class SqlPrd
{   


  /**
   * @name Constantes
   * @description Quelques constantes de classe pour identifier le type d'une 
   * transaction SQL
   */
  static SELECT : number = 1 ;
  static INSERT : number = 2 ;
  static UPDATE : number = 3 ;
  static DELETE : number = 4 ;

  /**
  * @ngdoc method
  * @name SqlPrd.exec
  * @param {string} sql SQL request
  * @param {array} sql array of SQL string request
  * @return {object} Return a promise
  * @description
  * Execute a SQL request or a array of SQL request
  */
    abstract exec( sql: string, bindings: Array<string> ): any
    
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
  abstract select( sql: string, bindings: Array<any>, array: Array<any>, offset: number, nblines: number ): any

  /**
  * @ngdoc method
  * @name createTable
  * @param {string} tableName SQL name of the table
  * @param {object} fields Object witch each attribute is a table's field. 
  * @return {object} return a promise
  * @description
  * Create a new table if not exist
  */
  abstract createTable( tableName: string, fields: Array<string> ): any

  /**
  * @ngdoc method
  * @name insert
  * @param {string} tableName SQL name of the table
  * @param {object} row Object witch each attribute content a value for table's field. 
  * @return {object} return a promise
  * @description
  * Insert a new record
  */
  abstract insert( tableName: string, row: any ): any
  
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
  abstract update( tableName: string, pk: any, row: any ): any

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
  abstract delete( tableName: string, pk: any, row: any ): any
    
    
      
  /**
   * @name getTypeOfSqlStatement
   * @param {string} sql: SQL statement
   * @returns {int} Type de la requête 1 : SELECT, 2: INSERT, 3: UPDATE ou 4: DELETE.
   */
  getTypeOfSqlStatement( sql: string ): number
  {
      if( sql.indexOf( "INSERT") >= 0 ) return SqlPrd.INSERT ;
      if( sql.indexOf( "UPDATE") >= 0 ) return SqlPrd.UPDATE ;
      if( sql.indexOf( "DELETE") >= 0 ) return SqlPrd.DELETE ;
      return SqlPrd.SELECT ;
  } 

  /**
   * @name createSqlWhereStatement
   * @param {array} pk: array of field name of primary key
   * @returns {String} WHERE SQL statement for primary condition
   * @description Crée et renvoie une chaine de caractère contenant la clause
   * WHERE d'une requete SQL construite à partir du tableau référencé par 
   * l'argument pk. Ce dernier contient la liste des champs constituant la clé
   * primaire. La chaine de caractère générée est de la forme:
   * WHERE champ1=? and champ2=?
   * Les caractères ? font référence au data-binding SQL
   * dont les valeurs sont transmises dans un tableau
   */
  createSqlWhereStatement( pk : Array<string> ): string
  {
      var sql = " WHERE " ;

      // Liste des champs de la cle primaire
      let first = true ;
      for( let i=0 ; i<pk.length ; i++ )
      {
          if( first )
          {
              sql += pk[i] + "=?"
              first = false ;
          }
          else sql += " AND " + pk[i] + "=?" ;
      }
      return sql ;
  }

  /**
   * @name createSqlUpdateStatement
   * @param {string} tableName: name of table to update
   * @param {array} pk: array of field name of primary key
   * @param {object} row: object with values
   * @returns {String} UPDATE SQL statement 
   * @description Crée et renvoie une chaine de caractère contenant une
   * requete SQL de type UPDATE sur la table dont le nom est donné par tableName.
   * La requete met à jour l'enregistrement indentifié par pk avec les valeurs
   * contenue dans row.
   * La chaine de caractère générée est de la forme:
   * UPDATE tableName SET champ1=?, champ2=? WHERE champ5=? and champ6=?
   * Les caractères ? font référence au data-binding SQL
   * dont les valeurs sont transmises dans un tableau
   */
  createSqlUpdateStatement( tableName: string, pk: Array<string>, row: any ): string
  {
      let sql = "UPDATE " + tableName + " SET " ;

      // Liste des champs avec valeurs
      let first = true ;
      for( let fieldName in row )
      {
        if( fieldName[0] != "$" && typeof row[fieldName] != "function" )
        {
          if( first )
          {
              sql += fieldName + "=?" ;
              first = false ;
          }
          else sql += "," + fieldName + "=?" ;
        }
      }
      sql += this.createSqlWhereStatement( pk ) ;

      return sql ;
  }

  /**
   * @name createSqlDeleteStatement
   * @param {string} tableName: name of table to update
   * @param {array} pk: array of field name of primary key
   * @param {object} row: object with values
   * @returns {String} DELETE SQL statement 
   * @description Crée et renvoie une chaine de caractère contenant une
   * requete SQL de type DELETE sur la table dont le nom est donné par tableName.
   * La requete supprime l'enregistrement indentifié par pk avec les valeurs
   * contenue dans row.
   * La chaine de caractère générée est de la forme:
   * DELETE FROM tableName WHERE champ1=? and champ2=?
   * Les caractères ? font référence au data-binding SQL
   * dont les valeurs sont transmises dans un tableau
   */
  createSqlDeleteStatement = function( tableName: string, pk: Array<string>, row: any ): string
  {
      let sql = "DELETE FROM " + tableName + this.createSqlWhereStatement( pk ) ;
      return sql ;
  };

  /**
   * @name createSqlInsertStatement
   * @param {string} tableName: name of table to update
   * @param {object} row: object with values
   * @returns {String} INSERT SQL statement 
   * @description Crée et renvoie une chaine de caractère contenant une
   * requete SQL de type INSERT sur la table dont le nom est donné par tableName.
   * La requete un nouvel enregistrement avec les valeurs contenue dans row.
   * La chaine de caractère générée est de la forme:
   * INSERT INTO tableName(champ1,champ2) VALUES(?,?)
   * Les caractères ? font référence au data-binding SQL
   * dont les valeurs sont transmises dans un tableau
   */
  createSqlInsertStatement = function( tableName: string, row: any ): string
  {
      let sql = "INSERT INTO " + tableName + " (" ;

      // Liste des champs
      let first = true ;
      for( let fieldName in row )
      {
        if( fieldName[0] != "$" && typeof row[fieldName] != "function" )
        {
          if( first )
          {
              sql += fieldName ;
              first = false ;
          }
          else sql += "," + fieldName ;
        }
      }
      sql += ") VALUES( " ;

      // Liste des ???
      first = true ;
      for( let fieldName in row )
      {
        if( fieldName[0] != "$" && typeof row[fieldName] != "function" )
        {
          if( first )
          {
              sql += "?"
              first = false ;
          }
          else sql += ",?" ;
        }
      }
      sql += ")" ;
      
      return sql ;
  }

  /**
  * @ngdoc method
  * @name createSqlCreateTableStatement
  * @param {string} tableName SQL name of the table
  * @param {object} fields Object witch each attribute is a table's field and value is data type. 
  * @return {object} return a promise
  * @description Crée et renvoie une chaine de caractère contenant une
  * requete SQL de type CREATE TABLE pour créer table dont le nom est donné par tableName.
  * avec les champs dont les noms sont donnés par les attributs de l'objet référencé
  * par l'argument fields et leurs types par leurs valeurs.
  * Exemple: {id: "int", nom: "text", prenom: "text"}
  * La chaine de caractère générée est de la forme:
  * CREATE TABLE IF NOT EXISTS tableName( champ1 type1, champ2 type2 )
  */
  createSqlCreateTableStatement = function( tableName: string, fields: any ): string
  {
    let sql = "CREATE TABLE IF NOT EXISTS " + tableName + " (" ;

    let first = true ;
    for( let fieldName in fields )
    {
      if( first )
      {
          sql += fieldName + " " + fields[fieldName] ;
          first = false ;
      }
      else sql += "," + fieldName + " " + fields[fieldName] ;
    }
    sql += ")" ;
    
    return sql ;
  } 
}

/**
 * 
 * @class SqlPrdAnswer
 * @constructor
 * @description Structure de la reponse renvoyée par le fournisseur d'acces SQL
 */
export class SqlPrdAnswer
{
    public sql: string ;
    public rows: Array<any> ;
    public error: string ;

    constructor( data: any )
    {
        
    }
}
