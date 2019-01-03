
export class LocalHttpServices 
{

    constructor() 
    {      
    }

    open( path: string ) 
    {
        return this.cmd( "open" + path ) ;
    }

    dir( path: string ) 
    {
        return this.cmd( "ls" + path ) ;
    }

    cmd( cmd: string ) 
    {
        return new Promise((resolve,reject)=>
        { ;
            var xhr = new XMLHttpRequest();
            var url = "http://127.0.0.1:8888/" + cmd ;

            xhr.open( "GET", url, true ) ;
            
            xhr.onload = function() 
            {
                var r  ;
                try
                {
                    var str = xhr.responseText.replace( /\r/g,'') ;
                    r = JSON.parse( str ) ;
                    resolve( new LocalHttpServicesData( r ) ) ;
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
                        
            xhr.send(null);
        }) ;
    }
}

export class LocalHttpServicesData
{
    public error: string ;
    public ok: boolean ;
    public cmd: string ;
    public files: Array<string> ;

    constructor( data: any )
    {
        this.error = data.error ;
        this.ok = data.ok ;
        this.cmd = data.cmd ;
        if( data.files ) this.files = data.files ;
        else this.files = [] ; 
    }
}