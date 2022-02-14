<?php  
class Product{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function addProductToInventory($data){

		$inventoryProduct = array(
			'quantity' => (int) $data['quantity'], 
			'product_id' => (int) $data['product_id'], 
			'branch_id' => (int) $data['branch_id'], 
			'discount_id' => (int) $data['discount_id'], 
			'status_id' => (int) $data['status_id']
		);
		// $inventory_id = true;
		$inventory_id = $this->p_instance->Save("inventory_tb", $inventoryProduct);

		if($inventory_id){
			echo json_encode(array('response'=> "success", 'message' => 'Operation completed successfully'));

		}else{
			echo json_encode(array('response'=> "failed", 'message' => 'Operation failed'));
		}
	}
	public function saveProduct($data){

		$Product = array(
			"product_name" => $data["product_name"],
			"description" => $data["description"],
			"category_id" => (int) $data["category_id"],
			"remarks"  => $data["remarks" ],
			"sale_price"  => (int) $data["sale_price" ],
			"buy_price" => (int) $data["buy_price"],
			"brand_id" => (int) $data["brand_id"],
			"colour_id" => (int) $data["colour_id"],
			"size_id" => (int) $data["size_id"],
			"product_code" => $data["product_code"],
			"supplier_id" => (int) $data["supplier_id"],
		);
		// $_id = true;
			// "productImage" => $data["productImage"],
		$product_id = $this->p_instance->Save("product_tb", $Product);

		if($product_id){
			$_id = $this->p_instance->Save('product_image_tb', array('product_image' => $data['productImage'], 'product_thumbnail' => $data['productImage'], 'product_id' => (int) $product_id, 'status_id' => 3));
			if($_id){
				echo json_encode(array('response'=> "success", 'message' => 'Operation completed successfully'));
			}else{
				echo json_encode(array('response'=> "success", 'message' => 'Operation half successfull, image saving failed'));
			}

		}else{
			echo json_encode(array('response'=> "failed", 'message' => 'Operation failed'));
		}
	}

	public function getInventory(){
		$sql = "
				SELECT iv.inventory_id, iv.quantity, iv.created_at, iv.modified_at, pt.product_name, pt.product_code, pt.buy_price, pt.sale_price, st.status_name, bh.branch_location as branch, bd.brand_name as brand, cy.category_name, dt.discount_name as discount
				FROM `inventory_tb` iv 
				LEFT OUTER JOIN status_tb st 
				ON iv.status_id = st.status_id 
				LEFT OUTER JOIN branch_tb bh 
				ON iv.branch_id = bh.branch_id  
				LEFT OUTER JOIN product_tb pt 
				ON iv.product_id = pt.product_id 
				LEFT OUTER JOIN brand_tb bd
				ON bd.brand_id = pt.brand_id  
				LEFT OUTER JOIN category_tb cy
				ON cy.category_id = pt.category_id  
				LEFT OUTER JOIN discount_tb dt 
				ON iv.discount_id = dt.discount_id ORDER BY iv.inventory_id DESC
			";
		$Inventory = $this->p_instance->getDetails($sql);
        $num = $Inventory->rowCount();
		$InventoryArr = array();
		if($num > 0){

			while ($row = $Inventory->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$Inventory_item = array(
					'id' => $inventory_id,
					'name' => $product_name,
					'quantity' => $quantity,
					'product_code' => $product_code,
					'buy_price' => $buy_price,
					'sale_price' => $sale_price,
					'status_name' => $status_name,
					'category' => $category_name,
					'brand' => $brand,
					'branch' => $branch,
					'discount' => $discount,
					'created_at' => $created_at,
					'modified_at' => $modified_at
				);

				array_push($InventoryArr, $Inventory_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $InventoryArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
	public function home_search($data){
		$sql = "
			SELECT iv.inventory_id, iv.quantity, iv.branch_id, iv.discount_id, iv.status_id, pt.*, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier, pi.product_image FROM inventory_tb iv
				LEFT OUTER JOIN product_tb pt 
                ON iv.product_id = pt.product_id
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id 
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                LEFT OUTER JOIN product_image_tb pi
                ON pi.product_id = pt.product_id
                WHERE iv.status_id = 3 AND pt.product_name LIKE '%".$data['search_value']."%' 
				ORDER BY pt.product_id DESC
			";

		$result = $this->p_instance->querySearch($sql, $data['search_value']);

		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'quantity' => $quantity,
					'inventory_id' => $inventory_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => ($product_image == null) ? "default.png": $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $productArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
	public function getInventoryProducts(){

		$sql = "
			SELECT iv.inventory_id, iv.quantity, iv.branch_id, iv.discount_id, iv.status_id, pt.*, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier, pi.product_image FROM inventory_tb iv
				LEFT OUTER JOIN product_tb pt 
                ON iv.product_id = pt.product_id
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id 
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                LEFT OUTER JOIN product_image_tb pi
                ON pi.product_id = pt.product_id
                WHERE iv.status_id = ?
				ORDER BY pt.product_id DESC
			";

		$result = $this->p_instance->getDetails($sql, array('id' => 3));

		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'quantity' => $quantity,
					'inventory_id' => $inventory_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => ($product_image == null) ? "default.png": $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $productArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}

	}

	public function updateProduct($product_details){
		// CHECK IF PRODUCT HAS IMAGE
		$product_image = $this->p_instance->getDetails("SELECT * FROM product_image_tb WHERE product_id = ?", array('product_id' => (int) $product_details['product_id']))->fetch(PDO::FETCH_ASSOC);
		if($product_image){
			if($product_image->product_image != $product_details['productImage']){
				$product_info = $this->p_instance->updateDetails('product_image_tb', 'product_id', (int) $product_details['product_id'], array('product_image' => $product_details['productImage']));
			}
		}else{
			$_id = $this->p_instance->Save('product_image_tb', array('product_image' => $product_details['productImage'], 'product_thumbnail' => $product_details['productImage'], 'product_id' => (int) $product_details['product_id'], 'status_id' => 3));
		}
		$product = array(
			"product_name" => $product_details["product_name"],
			"description" => $product_details["description"],
			"category_id" => (int) $product_details["category_id"],
			"remarks"  => $product_details["remarks" ],
			"sale_price"  => (int) $product_details["sale_price" ],
			"buy_price" => (int) $product_details["buy_price"],
			"brand_id" => (int) $product_details["brand_id"],
			"colour_id" => (int) $product_details["colour_id"],
			"size_id" => (int) $product_details["size_id"],
			"product_code" => $product_details["product_code"],
			"supplier_id" => (int) $product_details["supplier_id"]
		);
		$product_info = $this->p_instance->updateDetails('product_tb', 'product_id', (int) $product_details['product_id'], $product);
		echo json_encode(array('response' => "success", 'message' => "Operation completed successfully"));

	}
	public function updateInventory($inventory_details, $id){
		$inventory = array(
			'quantity' =>  (int)$inventory_details['quantity'], 
			'status_id' =>  (int) $inventory_details['status_id'], 
			'branch_id' => (int) $inventory_details['branch_id'], 
			'product_id' => (int) $inventory_details['product_id'], 
			'discount_id' =>  (int) $inventory_details['discount_id']
		);
		$inventory_info = $this->p_instance->updateDetails('inventory_tb', 'inventory_id', (int) $id, $inventory);
		if($inventory_info){
			echo json_encode(array('response' => "success", 'message' => "Operation completed successfully"));
		}else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}

	}
	
	public function searchByField($search_field, $search_value){
		$sql = "
			SELECT pt.*, iv.quantity, iv.inventory_id, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier FROM inventory_tb iv
				LEFT OUTER JOIN product_tb pt 
                ON iv.product_id = pt.product_id
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id 
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                WHERE pt.product_name = ?
				ORDER BY pt.product_id DESC
		";
		$result = $this->p_instance->getDetails($sql, array('product_name' => $search_value));


		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();
			$productColor = array();
			$productCSize = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				// GET PRODUCT IMAGE
				$product_image = $this->p_instance->getDetails("SELECT * FROM product_image_tb WHERE product_id = ?", array('product_id' => $product_id))->fetch(PDO::FETCH_ASSOC);

				$product_item = array(
					'id' => $product_id,
					'inventory_id' => $inventory_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at,
					'product_image' => $product_image
				);
				if (!in_array($colour_name, $productColor)){
					array_push($productColor, $colour_name);
					array_push($productCSize, array('size_id' => $size_id, 'size_label' => $size_label, 'colour_name' => $colour_name, 'product_code' => $product_code, 'product_image' => $product_image['product_image'], 'brand_name' => $brand_name,'sale_price' => $sale_price, 'desc' => $description,'name' => $product_name,'id' => $product_id,'category_name' => $category_name, 'quantity' => $quantity,'inventory_id' => $inventory_id, ));
				}else{
					array_push($productCSize, array('size_id' => $size_id, 'size_label' => $size_label, 'colour_name' => $colour_name, 'product_code' => $product_code, 'product_image' => $product_image['product_image'], 'brand_name' => $brand_name,'sale_price' => $sale_price, 'desc' => $description,'name' => $product_name,'id' => $product_id,'category_name' => $category_name,'quantity' => $quantity,'inventory_id' => $inventory_id,  ));
				}

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => [$productArr, $productColor, $productCSize]));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}

	}
	public function getInventoryDetails($id){
		$sql = "
			SELECT iv.inventory_id, iv.quantity, iv.branch_id, iv.discount_id , iv.discount_id, iv.status_id, pt.*, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier, pi.product_image FROM inventory_tb iv
				LEFT OUTER JOIN product_tb pt 
                ON iv.product_id = pt.product_id
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id 
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                LEFT OUTER JOIN product_image_tb pi
                ON pi.product_id = pt.product_id
                LEFT OUTER JOIN discount_tb dt 
                ON dt.discount_id = iv.discount_id
                WHERE iv.inventory_id = ?
				ORDER BY pt.product_id DESC
			";

		$result = $this->p_instance->getDetails($sql, array('inventory_id' => $id));

		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'quantity' => $quantity,
					'inventory_id' => $inventory_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'branch_id' => $branch_id, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'status_id' => $status_id, 
					'discount_id' => $discount_id, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => ($product_image == null) ? "default.png": $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $productArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
	public function getProductDetails($product_id){
		$sql = "
			SELECT pt.*, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier FROM product_tb pt 
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id 
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                WHERE pt.product_id = ?
				ORDER BY pt.product_id DESC
		";
		$result = $this->p_instance->getDetails($sql, array('product_id' => $product_id));
		$product_image = $this->p_instance->getDetails("SELECT * FROM product_image_tb WHERE product_id = ?", array('product_id' => $product_id))->fetch(PDO::FETCH_ASSOC);

                // -- LEFT OUTER JOIN product_image_tb pi , pi.product_image 
                // -- ON pi.product_id = pt.product_id
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at,
					'product_image' => $product_image['product_image']
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $productArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}

	}

	public function getProducts(){
		$sql = "
			SELECT pt.*, cy.category_name, bd.brand_name, cr.colour_name, sz.size_label, CONCAT(sr.fname, ' ', sr.lname)AS supplier, pi.product_image FROM product_tb pt 
				LEFT OUTER JOIN category_tb cy 
				ON pt.category_id = cy.category_id 
				LEFT OUTER JOIN brand_tb bd 
				ON pt.brand_id = bd.brand_id 
				LEFT OUTER JOIN colour_tb cr 
				ON pt.colour_id = cr.colour_id 
				LEFT OUTER JOIN size_tb sz 
				ON pt.size_id = sz.size_id
				LEFT OUTER JOIN supplier_tb sr 
				ON pt.supplier_id = sr.supplier_id
                LEFT OUTER JOIN product_image_tb pi
                ON pt.product_id = pi.product_id
				ORDER BY pt.product_id DESC
		";
		// $result = $this->p_instance->fetchAll('product_tb');
		$result = $this->p_instance->getDetails($sql);

		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$productArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$product_item = array(
					'id' => $product_id,
					'name' => $product_name,
					'desc' => $description,
					'category_id' => $category_id, 
					'remarks' => $remarks, 
					'sale_price' => $sale_price, 
					'buy_price' => $buy_price, 
					'brand_id' => $brand_id, 
					'colour_id' => $colour_id, 
					'size_id' => $size_id, 
					'brand_name' => $brand_name, 
					'colour_name' => $colour_name, 
					'category_name' => $category_name, 
					'size_label' => $size_label, 
					'supplier' => $supplier, 
					'product_code' => $product_code, 
					'product_image' => $product_image, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
				);

				array_push($productArr, $product_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $productArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>