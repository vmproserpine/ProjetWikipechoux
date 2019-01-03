import { Component, Input, Output, Renderer2, ElementRef, EventEmitter } from '@angular/core';

/**
 * Generated class for the TextAreaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'text-area',
  templateUrl: 'text-area.html'
})
export class TextAreaComponent 
{

  @Input() private text: string ;
  @Input() private cols: number ;
  @Input() private rows: number ;
  @Output() textChange = new EventEmitter<string>() ;

  constructor( private renderer: Renderer2, private el: ElementRef ) 
  {
  }

  ngOnInit()
  {
    let t = this.el.nativeElement.children[0].children[0] ;
    t.cols = this.cols ;
    t.rows = this.rows ;
    t.value = this.text ;
  }

  onChange( event )
  {
    this.text = event.target.value ;
    this.textChange.emit( this.text ) ;
  }


}
