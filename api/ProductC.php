<?php  
class ProductsC{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getProducts(){
		$result = $this->p_instance->fetchAll('product_tb');
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
					'product_code' => $product_code, 
					'supplier_id' => $supplier_id, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
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
}
?>