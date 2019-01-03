<?php
    // Ajout de la directive CORS
    header( "Access-Control-Allow-Origin:*") ;

    include 'config.php';

    //session_start() ;

    $fileName = $_FILES["file"]["name"] ;
    $fileTmpName = $_FILES["file"]["tmp_name"] ;
    $fileType = $_FILES["file"]["type"] ;
    $fileSize = $_FILES["file"]["size"] ;
    $fileError = $_FILES["file"]["error"] ;
    
    $filePrefixe = $_POST["filePrefixe"] ;
    $imageDirectory = $_POST["imageDirectory"] ;
    
    if( !$fileError )
    {
        $t = explode( ".", $fileName ) ;
        //$newFileType = $t[1] ;
        $newFileName = $filePrefixe . "_" . date('Ymd-his', time()) . ".jpg" ;
        $newFilePath = $imageDirectory . "/" . $newFileName ;
        
        if( is_uploaded_file( $fileTmpName ))
        {
            if( move_uploaded_file($fileTmpName, $newFilePath ) ) 
            {
                
                echo "{\"status\":\"ok\", \"filePath\":\"" . $newFilePath . "\", \"fileName\":\"" . $newFileName . "\", \"filePrefixe\":\"" . $filePrefixe . "\"}" ;
            }
            else
            {
                echo "{\"status\":\"error\", \"message\":\"Ne trouve pas le fichier\", \"fileTmpName\":\"" . $fileTmpName . "\",\"filePath\":\"" . $newFilePath . "\", \"fileName\":\"" . $newFileName . "\", \"filePrefixe\":\"" . $filePrefixe . "\", \"dir\":\"" . getcwd() . "\"}" ;            
            }
        }
        else
        {
            echo "{\"status\":\"error\", \"message\":\"Le fichier n'est pas téléchargé\", \"fileTmpName\":\"" . $fileTmpName . "\",\"filePath\":\"" . $newFilePath . "\", \"fileName\":\"" . $newFileName . "\", \"filePrefixe\":\"" . $filePrefixe . "\"}" ;            
        }
    }
?>
