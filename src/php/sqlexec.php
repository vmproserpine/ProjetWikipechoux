<?php
    // Ajout de la directive CORS
    header( "Access-Control-Allow-Origin:*") ;
    
    // Ajout du jeu de caractère UTF-8
    header('Content-Type: text/html; charset=UTF-8') ;

    require_once( "config.php") ;

    $dbId = "" ;
    if( array_key_exists( "dbid", $_POST ) ) $dbId = $_POST["dbid"] ;
    else if( array_key_exists( "dbid", $_GET ) ) $dbId = $_GET["dbid"] ;
    
    $dbName = "infodoc" ;
    if( array_key_exists( "dbname", $_POST ) ) $dbName = $_POST["dbname"] ;
    else if( array_key_exists( "dbname", $_GET ) ) $dbName = $_GET["dbname"] ;

    $sql = "select * from users" ;
    if( array_key_exists( "sql", $_POST ) ) $sql = $_POST["sql"] ;
    else if( array_key_exists( "sql", $_GET ) ) $sql = $_GET["sql"] ;
    
    $valueStr = "" ;
    if( array_key_exists( "valueStr", $_POST ) ) $valueStr = $_POST["valueStr"] ;
    else if( array_key_exists( "valueStr", $_GET ) ) $valueStr = $_GET["valueStr"] ;
    $values = json_decode( $valueStr, true ) ;

    $pkStr = "" ;
    if( array_key_exists( "pkStr", $_POST ) ) $pkStr = $_POST["pkStr"] ;
    else if( array_key_exists( "pkStr", $_GET ) ) $pkStr = $_GET["pkStr"] ;
    $pk = json_decode( $pkStr, true ) ;

    $queryid = "" ;
    if( array_key_exists( "queryid", $_POST ) ) $queryid = $_POST["queryid"] ;
    else if( array_key_exists( "queryid", $_GET ) ) $queryid = $_GET["queryid"] ;

    $lineOffset = 0 ;
    if( array_key_exists( "lineoffset", $_POST ) ) $lineOffset = $_POST["lineoffset"] ;
    else if( array_key_exists( "lineoffset", $_GET ) ) $lineOffset = $_GET["lineoffset"] ;

    $nbLines = 999999999 ;
    if( array_key_exists( "nblines", $_POST ) ) $nbLines = $_POST["nblines"] ;
    else if( array_key_exists( "nblines", $_GET ) ) $nbLines = $_GET["nblines"] ;
    
    echo "{\"sql\":\"" . $sql . "\"";

    if( $dbName == "" )
    {
        echo ",\"error\":\"Argument dnname non renseigné.\"}" ;
        die();        
    }

    try
    {
        if( $config["db_connectstring"] )
        {
            $db = new PDO( $config["db_connectstring"], $config["db_usr"], $config["db_pwd"] ) ;
        }
        else
        {
            $db = new PDO( 'mysql:host=' . $config["db_host"] . ';dbname=' . $dbName, $config["db_usr"], $config["db_pwd"] );            
        }

        $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION ) ;

        if( $sql != "" )
        {                
            if( strtoupper( substr( $sql, 0, 6) ) == "SELECT" )
            {
                $whereValues = array() ;

                foreach($values as $name => $value) 
                {
                    if( $value != "null" ) array_push( $whereValues, utf8_decode($value) ) ;
                    else array_push( $whereValues, null ) ;
                }

                $cursor = $db->prepare( utf8_decode($sql) );
                if( $cursor->execute( $whereValues ) ) 
                {
                    $firstrow = true ;
                    echo ", \"rows\":[" ;

                    // Fetch jusqu'à l'offset
                    for( $i=0 ; $i<$lineOffset && $cursor->fetch() ; $i++ ) ;

                    $numLine = 0 ;
                    while( ($row = $cursor->fetch()) && $numLine < $nbLines  ) 
                    {
                        if( $firstrow ) echo "{" ;
                        else echo ",{" ;

                        $firstfield = true ;

                        foreach( $row as $name=>$value )
                        {
                            if( is_string($value) ) $value = utf8_encode($value) ;

                            $value = str_replace('"', '\"', $value ) ;
                            $value = str_replace('<virg>', ',', $value ) ;
                            $value = str_replace('<dieze>', '#', $value ) ;
                            $value = str_replace('<dblcote>', '\"', $value ) ;
                            $value = str_replace('<cote>', '\'', $value ) ;
                            $value = str_replace('<etcom>', '&', $value ) ;
                            $value = str_replace( chr(0), '0', $value ) ;
                            $value = str_replace( chr(1), '1', $value ) ;
                            $value = str_replace( chr(13), '\n', $value ) ;
                            $value = str_replace( chr(10), '\n', $value ) ;
                            //$value = str_replace( chr(92), '/', $value ) ;
                            if( !is_numeric($name) )
                            {
                                if( $firstfield ) echo "\"$name\":\"$value\"" ;
                                else echo ",\"$name\":\"$value\"" ;
                                $firstfield = false ;
                            }
                        }
                        echo "}" ;
                        
                        $firstrow = false ;
                        $numLine++ ;                        
                    }
                    echo "],\"error\":null}" ;
                }
            }
            else
            {
                $whereValues = array() ;

                foreach($values as $name => $value) 
                {
                    if( $value != "null" ) array_push( $whereValues, utf8_decode($value) ) ;
                    else array_push( $whereValues, null ) ;
                }

                foreach($pk as $name => $value) 
                {
                    if( $value != "null" ) array_push( $whereValues, utf8_decode($value) ) ;
                    else array_push( $whereValues, null ) ;
                }

                $cursor = $db->prepare( $sql );
                if( $cursor->execute( $whereValues ) ) 
                {
                    echo ",\"error\":null}" ;
                }
                
                // Log transaction
                if( $dbId != "" && $dbId != "0" )
                {
                    $v = array( "$dbId", "$sql", "$fields") ;
                    $cursor = $db->prepare( "insert into reptransactions(dbid,sqlstr,valuesstr) values(?,?,?)") ;
                    if( $cursor->execute( $v ) ) 
                    {
                        echo ",\"error\":null}" ;
                    }
                }
            }
        }
        else 
        {
            echo ",\"error\":\"argument sql non renseigne.\"}" ;
        }
    }
    catch (PDOException $e) 
    {
        $msg = $e->getMessage() ;
        //if( strpos( $msg, "SQLSTATE[23000]" ) >= 0 ) $msg = "SQLERR01: Enregistrement déjà existant" ;
        echo ",\"error\":\"". $msg . "\"}" ;        
        die();
    }    
?>

