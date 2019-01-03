var http = require("http");
var fs = require( "fs" ) ;
var child_process = require('child_process');

var config = {
    ipListener:"127.0.0.1", 
    portListener: 8888, 
    verbose:true } ;

var server = http.createServer(function(req, res)
{
    res.writeHead( 200, {
        "Content-Type" : "text/html",
        "Access-Control-Allow-Origin" : "*"
    } ) ;

    var cmd = req.url.replace( /%20/g, " " ) ;

    let answer = {
        error: null,
        cmd: cmd,
        ok: null,
        files: []
    } ;

    if( cmd.indexOf( "/ls") == 0 )
    {
        var path = cmd.replace( "/ls", "" ) ;

        console.log( "liste le repertoire: " + path ) ;
        
        fs.readdir( path, (err, files)=>
        {
            answer.ok = true ;
            answer.files = files ;
            res.write( JSON.stringify( answer ) ) ;
            res.end() ;
        
        }) ;
    }
    else if( cmd.indexOf( "/open") == 0 )
    {
        var file = cmd.replace( "/open", "" ) ;

        console.log( "ouvre le fichier: " + file ) ;

        cmd = 'xdg-open "' + file + '"' ;
        child_process.exec( cmd, (err, [], stdout, stderr)=>
        {
            if( err ) 
            {
                answer.error = "Error on " + cmd ;
            }
            else
            {
                answer.ok = true ;
            }
            res.write( JSON.stringify( answer ) ) ;
            res.end() ;        
        }) ;
    }
}) ;

console.log( "Listen " + config.ipListener+ ":" + config.portListener ) ;

server.listen( config.portListener, config.ipListener );