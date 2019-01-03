import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../providers/remotesql/remotesql';
import { Modele } from '../tools/Modele' ;

export class ListeSqlModelePage
{

  protected liste: Array<Modele> ;
  private selectedObject: Modele ;
  protected modeleObject: Modele ;
  private classDetailView: any ;

  constructor( 
    modeleObject: Modele,
    classDetailView: any,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider )
  {
    this.modeleObject = modeleObject ;
    this.classDetailView = classDetailView ;
    this.liste = [] ;
    this.selectedObject = null ;
  }

  onAfterNewItem( object: any )
  {
    return new Promise( (resolve, reject )=>
    {
      resolve( object ) ;
    }) ;
  }

  clear()
  {
    this.liste = [] ;
    this.selectedObject = null ;
  }

  select( sql: string, bindings: Array<any> )
  {
    this.liste = [] ;
    
    return this.sqlPrd.select( sql, bindings ).then( (data)=>
    {
      data.rows.forEach( (object) => 
      {
        this.liste.push( this.modeleObject.clone( object ) ) ;  
      }); 
      return this.liste ;
    });

  }

  onSelectItem(event, object ) 
  {
    this.selectedObject = object ;
    if( this.classDetailView )
    {
      this.navCtrl.push( this.classDetailView, {object: object} ) ;
    }
  }

  onNewItem()
  {
    let object = this.modeleObject.clone() ;
    this.liste.push( object ) ;
    this.selectedObject = object ;

    this.onAfterNewItem( object ).then( (object: any)=>
    {
      if( this.classDetailView ) 
      {
        this.navCtrl.push( this.classDetailView, {object: object} ) ;
      }  
    }) ;
  }

  ionViewWillEnter()
  {
    if( this.selectedObject )
    {
      if( this.selectedObject.isNew() ) 
      {
        this.liste.pop() ;
      }
      else if( this.selectedObject.isDeleted() ) 
      {
        let i = this.liste.indexOf( this.selectedObject ) ;
        if( i >= 0 ) this.liste.splice( i, 1 ) ;
      }
      this.selectedObject = null ;
    }
  }

  addStringFilter( where: string, fieldName: string, values: Array<string> )
  {
    if( values.length )
    {
      where += " and " + fieldName + " in(\'" + values[0] + "\'" ;
      for( let i=1 ; i<values.length ; i++ ) where += ",\'" + values[i] + "\'" ;
      where += ")" ;
    }
    return where ;
  }

  addNumberFilter( where: string, fieldName: string, values: Array<number> )
  {
    if( values.length )
    {
      if( values[0] >= 0 ) 
      {
        where += " and " + fieldName + " in(" + values[0] ;
        for( let i=1 ; i<values.length ; i++ ) where += "," + values[i]  ;
        where += ")" ;
      } 
    }
    return where ;
  }

}
