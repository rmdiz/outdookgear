<?php  

	// INNITUALIAZE API
	require_once('../core/init.php');
	// INSTANCIATE PRODUCT MODEL/CLASS @(RECEIVING DATA)
	$products = new Products($db);
	// INSTANCIATE PRODUCT CONTROLLER/CLASS @(LOGIC AFTER RECEIVING DATA)
	require_once('../api/ProductC.php');
	$productController = new ProductsC($products);

	$request = $_POST['action'];

	// ROUTES
	switch ($request) {
		case 'fetch_all_products':
			$productController->getProducts();
			break;
		
		default:
			echo json_encode(array('message' => 'Nothing found'));			
			break;
	}
?>