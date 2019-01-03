<?php			
$config = array() ;

// Connection a la base de donnee
//$config["db_usr"] = "root" ;
//$config["db_pwd"] = "" ;
//$config["db_connectstring"] = "ODBC;DSN=EchantillonLaboDb;DATABASE=echantillonlabo;uid=clabo;pwd=admin@1234" ;
//$config["db_connectstring"] = "driver={SQL Server};server=AXEL-W7;uid=clabo;pwd=admin@1234;database=echantillonlabo" ;
//$config["db_connectstring"] = "driver={SQL Server};server=AXEL-W7;uid=clabo;pwd=admin@1234;database=echantillonlabo" ;

// sql server
/*
$config["db_host"] = "localhost" ;
$config["db_usr"] = "clabo" ;
$config["db_pwd"] = "admin@1234" ;
$config["db_connectstring"] = "ODBC;DSN=EchantillonLaboDb" ;
*/

// sql server driver
/*
$config["db_host"] = "192.168.1.14" ;
$config["db_usr"] = "clabo" ;
$config["db_pwd"] = "admin@1234" ;
$config["db_connectstring"] = "sqlsrv:server=localhost;Database=echantillonlabo" ;
 */



// My sql GV Psy
/*
$config["db_host"] = "gvpsyfrgma646.mysql.db" ;
$config["db_usr"] = "gvpsyfrgma646" ;
$config["db_pwd"] = "h3yk68PU" ;
*/


$config["db_host"] = "localhost" ;
$config["db_usr"] = "root" ;
$config["db_pwd"] = "root" ;


$_ENV["config"] = $config ;
?>

