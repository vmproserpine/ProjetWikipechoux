
export class Modele 
{
  private $state: number;
  private $initialData: any ;

  public static ISOK = 0 ;
  public static ISNEW = 1 ;
  public static ISDIRTY = 2 ;
  public static ISDELETED = 4 ;

  constructor( data: any = null) 
  {      
    if( data ) 
    {
      for( let fieldName in data ) this[fieldName] = data[fieldName] ;
      this.$state = Modele.ISOK ;
    }
    else this.$state = Modele.ISNEW ;

    this.$initialData = data ;
  }

  public getState(): number
  {
      return this.$state ;
  }

  public resetState()
  {
    for( let k in this.$initialData )
    {
      this.$initialData[k] = this[k] ;
    }
    this.$state = Modele.ISOK ;
  }

  public restoreInitialData()
  {
    for( let k in this.$initialData )
    {
        this[k] = this.$initialData[k] ;
    }
    this.$state = Modele.ISOK ;
  }

  public isDirty(): boolean
  {
    for( let k in this.$initialData )
    {
      if( this[k] != this.$initialData[k] ) return true ;
    }
    return false ;
  }

  public isNew(): boolean
  {
      return (this.$state & Modele.ISNEW ) != 0 ;
  }

  public isDeleted(): boolean
  {
      return (this.$state & Modele.ISDELETED ) != 0 ;
  }

  public setDeleted()
  {
      this.$state |= Modele.ISDELETED ;
  }

  public setNew()
  {
      this.$state |= Modele.ISNEW ;
  }

  public clone( data: any = null ): Modele
  {
    return new Modele( data ) ;
  }
}