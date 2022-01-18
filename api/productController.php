<?php  

	// INNITUALIAZE API
	require_once('../core/init.php');
	// INSTANCIATE GENERAL CLASS
	$products = new Products($db);

	$request = $_POST['action'];

	// ROUTES
	switch ($request) {
		case 'fetch_all_products':
			getProducts($products);
			break;
		
		default:
			echo json_encode(array('message' => 'Nothing found'));			
			break;
	}

	function getProducts($products){
		$result = $products->fetchAll('product_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'name' => $product_name
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode($productArr);
		}
		else{
			echo json_encode(array('message' => 'Nothing found'));
		}
	}
?>