import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalHttpServices, LocalHttpServicesData } from '../../tools/local-http-services' ;

/**
 * Generated class for the FileSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file-selector',
  templateUrl: 'file-selector.html'
})
export class FileSelectorComponent 
{
  @Input() private baseDirectory: string ;
  @Input() private path: string ;
  @Input() private showOpenButton: string = null ;
  @Output() pathChange = new EventEmitter<string>() ;
  
  private files: Array<string> ;
  private currentPath: string ;
  private originalPath: string ;
  private localServices : LocalHttpServices ;

  constructor() 
  {
    this.files = [] ;

    if( this.baseDirectory ) this.currentPath = this.baseDirectory ;
    else this.currentPath = "/" ;

    this.localServices = new LocalHttpServices() ;
    if( !this.showOpenButton ) this.showOpenButton = "no" ;
  }

  onOpenDir()
  {

    this.originalPath = this.path ;

    if( this.path && this.path.lastIndexOf(".") >= 0 )
    {
      let n = this.path.lastIndexOf( "/") ;
      this.currentPath = this.path.substr( 0, n ) ;
    }

    if( !this.currentPath )
    {
      if( this.baseDirectory ) this.currentPath = this.baseDirectory ;
      else this.currentPath = "/" ;
    }

    this.localServices.dir( this.currentPath ).then( (data: LocalHttpServicesData )=>
    {
      this.files = data.files ;
    } ) ; 
  }

  onSelectDir( file )
  {
    if( this.currentPath.charAt( this.currentPath.length-1) != "/") this.currentPath += "/" ;
    this.currentPath += file ;

    this.localServices.dir( this.currentPath ).then( (data: LocalHttpServicesData )=>
    {
      this.files = data.files ;
      this.path = this.currentPath ;
      this.pathChange.emit( this.path ) ;
    } ) ; 

  }

  onOpenFile()
  {
    this.localServices.open( this.path ) ;
  }

  onParentDir()
  {
    let n = this.currentPath.lastIndexOf( "/") ;
    if( n >= 0 ) this.currentPath = this.currentPath.substr( 0, n ) ;
    else this.currentPath = "/" ;

    this.localServices.dir( this.currentPath ).then( (data: LocalHttpServicesData )=>
    {
      this.files = data.files ;
    } ) ; 
  }

  onOk()
  {
    this.files = [] ;
  }

  onCancel()
  {
    this.path = this.originalPath ;
    this.files = [] ;
  }

}
