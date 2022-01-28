<?php  
	// DEFINE CONSTANTS
	define('DS', DIRECTORY_SEPARATOR);
	define('CONFIG_PATH', '..'.DS.'config'.DS);
	define('CORE_PATH', '..'.DS."core".DS);

	// LOAD THE CONFIG FILE FIRST TO GET ACCESS TO DB CONNECTION
	require_once(CONFIG_PATH.'DbConnection.php');

	// CREATE AN INSTANCE OF THE DATABASE CONNECTION
	$dbCon = new DbConnection();
	$db = $dbCon->getConnection();

	// CORE CLASSES
	require_once(CORE_PATH.'Products.php');
	require_once(CORE_PATH.'Model.php');
?>