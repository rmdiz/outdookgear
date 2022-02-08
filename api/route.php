<?php  

	// INNITUALIAZE API
	require_once('../core/init.php');
	// INSTANCIATE PRODUCT MODEL/CLASS @(RECEIVING DATA)
	$Model = new Model($db);
	// $products = new Products($db);
	// INSTANCIATE PRODUCT CONTROLLER/CLASS @(LOGIC AFTER RECEIVING DATA);
	require_once('../api/Product.php');
	$productController = new Product($Model);
	require_once('../api/Branch.php');
	$branchController = new Branch($Model);
	require_once('../api/Brand.php');
	$brandController = new Brand($Model);
	require_once('../api/Category.php');
	$categoryController = new Category($Model);
	require_once('../api/Discount.php');
	$discountController = new Discount($Model);
	require_once('../api/Status.php');
	$statusController = new Status($Model);
	require_once('../api/Color.php');
	$colorController = new Color($Model);
	require_once('../api/Size.php');
	$sizeController = new Size($Model);
	require_once('../api/Supplier.php');
	$supplierController = new Supplier($Model);
	require_once('../api/PaymentTypes.php');
	$paymentTypesController = new PaymentTypes($Model);

	$request = $_POST['action'];

	// ROUTES
	switch ($request) {
		case 'fetch_all_products':
			$productController->getProducts();
			break;
		case 'fetch_all_inventory':
			$productController->getInventory();
			break;
		case 'fetch_all_inventory_products':
			$productController->getInventoryProducts();
			break;
		case 'fetch_all_branches':
			$branchController->getBranches();
			break;
		case 'fetch_all_categories':
			$categoryController->getCategories();
			break;
		case 'fetch_all_brands':
			$brandController->getBrands();
			break;
		case 'fetch_all_payment_types':
			$paymentTypesController->getPaymentTypes();
			break;
		case 'fetch_all_colors':
			$colorController->getColors();
			break;
		case 'fetch_all_discounts':
			$discountController->getDiscounts();
			break;
		case 'fetch_all_status':
			$statusController->getStatus();
			break;
		case 'add_product_to_inventory':
			$productController->addProductToInventory($_POST['data']);

			break;
		case 'add_product':
			$productController->saveProduct($_POST['data']);

			break;
		case 'fetch_all_suppliers':
			$supplierController->getSuppliers();
			break;
		case 'fetch_all_sizes':
			$sizeController->getSize();
			break;
		case 'fetch_all_available_colors':
			$colorController->getColors();
			break;
		case 'update_product':
			$productController->updateProduct($_POST['data']);
			break;
		case 'update_inventory':
			$productController->updateInventory($_POST['data'], $_POST['id']);
			break;
		case 'get_product_details':
			$productController->getProductDetails($_POST['product_id']);
			break;
		case 'get_inventory_details':
			$productController->getInventoryDetails($_POST['id']);
			break;
		case 'authenticate':
			require_once('../api/Auth.php');
			$auth = new Auth($Model);
			$auth->authenticate($_POST["username"], $_POST["password"]);
			break;
		default:


			// Count total files
			$countfiles = isset($_FILES['files']['name']) ? count($_FILES['files']['name']) : 0;

			// To store uploaded files path
			$files_arr = array();
			if($countfiles != 0){
				// Upload directory
				$upload_location = "../images/";

				// Loop all files
				for($index = 0;$index < $countfiles;$index++){

				   	if(isset($_FILES['files']['name'][$index]) && $_FILES['files']['name'][$index] != ''){
						// File name
						$filename = $_FILES['files']['name'][$index];

						// Get extension
						$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

						// Valid image extension
						$valid_ext = array("png","jpeg","jpg");

				      	// Check extension
						if(in_array($ext, $valid_ext)){

							// File path explode('.', $_FILES['files']['name'][$index])[0]
							$fname = rand(1000,1000000).'-'.date('Y-m-d-H-i-s').'.png';
							$path = $upload_location.$fname;
							// $path = $upload_location.$filename;


							// Upload file
							if(move_uploaded_file($_FILES['files']['tmp_name'][$index], $path)){
								// $files_arr[] = $path;
								$files_arr[] = $fname;
							}else{
								echo "upload process failed " . $_FILES['files']['tmp_name'][$index];
							}
						}
						else{
							echo "file not alowed";

						}
					}else{
							echo "failed";
					}
				}

				echo json_encode($files_arr);			
			}else{
				echo json_encode(array('message' => 'Nothing found'));			

			}
			
			break;
	}
?>