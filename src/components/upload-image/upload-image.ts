import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'upload-image',
  template: "<input type='file'" +  
    " multiple (change)='onFileInputChange( $event )' >" +
    "<div *ngIf='showSizeList==\"true\"'>Taille:" + 
    "<select [(ngModel)]='imageSize'> " +
    "<option value='100'>100 px</option> " +
    "<option value='200'>200 px</option> " +
    "<option value='300'>300 px</option> " +
    "<option value='400'>400 px</option> " +
    "</select></div>" 
})

 

 export class UploadImage
 {
    @Input("show-size-list") private showSizeList: string ;
    @Input() private uploadSrvUrl: string ;

    @Input() private filePrefixe: string ;
    @Input() private imageSize: number ;
    @Input() private imageDirectory: string ;

    @Input() private imagegUrl: string ;
    @Output() imageUrlChange = new EventEmitter<string>() ;

 
    constructor()
    {
        this.imageSize = 100 ;
    }

    ngOnInit()
    {
        if( !this.showSizeList ) this.showSizeList = "false" ;
        if( !this.filePrefixe ) this.filePrefixe = "img" ;
        if( !this.imageDirectory ) this.imageDirectory = "images" ;
        if( !this.uploadSrvUrl ) this.uploadSrvUrl = "http://localhost/bd/" ;

    }

    dataURLToBlob( dataURL) 
    {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) 
        {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];

            return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw: any = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) 
        {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }

    uploadFile( file ) 
    {
        var $this = this ;
        var xhr = new XMLHttpRequest();
        xhr.open( "POST", this.uploadSrvUrl + "upload.php" ) ;
        
        xhr.onload = function() 
        {
            var r ;
            try
            {
                r = JSON.parse( xhr.responseText ) ;
                if( r.status == "ok" )
                {
                    document.execCommand( "insertImage", false, $this.uploadSrvUrl + r.filePath ) ;
                    $this.imageUrlChange.emit( $this.uploadSrvUrl + r.filePath ) ;
                }
            }
            catch( err )
            {
                console.error("Parsing error:", err.message + " dans " + xhr.responseText ) ; 
            }
        };
        
        xhr.onerror = function() 
        {
            console.log(this.responseText);
        };

        xhr.upload.onprogress = function(event) 
        {
        };

        var formData = new FormData();
        formData.append('file', file);
        formData.append('filePrefixe', this.filePrefixe );
        formData.append('imageDirectory', this.imageDirectory );

        xhr.send(formData);
    }

    onFileInputChange( event )
    {
        var $this = this ;
        var files = event.target.files ;
        var docId = event.target.attributes[event.target.attributes.length-1].value ;
        var filesLen = files.length ;
        var allowedTypes = ["jpg","jpeg"] ;
        var imgType ;

        var current_file = files[0];
        var reader = new FileReader();

        if (current_file.type.indexOf('image') == 0) 
        {
            reader.onload = function (event: any) 
            {                
                var image = new Image();
                image.src = event.target.result;

                image.onload = function() 
                {
                    var maxWidth = $this.imageSize,
                        maxHeight = $this.imageSize,
                        imageWidth = image.width,
                        imageHeight = image.height;


                    if (imageWidth > imageHeight) 
                    {
                        if (imageWidth > maxWidth) 
                        {
                            imageHeight *= maxWidth / imageWidth;
                            imageWidth = maxWidth;
                        }
                    }
                    else 
                    {
                        if (imageHeight > maxHeight) 
                        {
                            imageWidth *= maxHeight / imageHeight;
                            imageHeight = maxHeight;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    image.width = imageWidth;
                    image.height = imageHeight;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage( image, 0, 0, imageWidth, imageHeight);

                    // Convert the resize image to a new file to post it.
                    $this.uploadFile( $this.dataURLToBlob(canvas.toDataURL(current_file.type))) ;
                }
            }
            reader.readAsDataURL(current_file);
        }
    }
}