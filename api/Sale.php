<?php  
class Sale{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getSales(){
		$sql = "
				SELECT sd.*, pt.product_code, pt.product_name, CONCAT(ct.fname, ' ' , ct.lname) as customer_name, pt.sale_price, btt.brand_name, bt.branch_location, cy.category_name, ut.username FROM `sold_tb` sd 
				LEFT OUTER JOIN product_tb pt
			    ON sd.product_id = pt.product_id 
			    LEFT OUTER JOIN brand_tb btt 
			    ON pt.brand_id = btt.brand_id
			    LEFT OUTER JOIN category_tb cy 
			    ON pt.category_id = cy.category_id
			    LEFT OUTER JOIN customer_tb ct 
			    ON sd.customer_id = ct.customer_id 
			    LEFT OUTER JOIN user_tb ut 
			    ON sd.attendant_id = ut.user_id 
			    LEFT OUTER JOIN attendant_tb att 
			    ON sd.attendant_id = att.user_id 
			    LEFT OUTER JOIN branch_tb bt 
			    ON att.branch_id = bt.branch_id  
			    LEFT OUTER JOIN payment_type_tb ptt 
			    ON sd.payment_type_id = ptt.payment_type_id 
			    LEFT OUTER JOIN discount_tb dt 
			    ON sd.discrount_id = dt.discount_id
			    
		";
		$result = $this->p_instance->getDetails($sql, array());

		// GET NUMBER OF ROWS

		$num = $result->rowCount();
		if($num > 0){
			$Salerr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$Saleitem = array(
					'purchase_id' => $purchase_id, 	
					'product_id' => $product_id, 	
					'purchase_date' => $purchase_date, 	
					'customer_id' => $customer_id, 	
					'attendant_id' => $attendant_id, 	
					'quantity' => $quantity, 	
					'payment_type_id' => $payment_type_id, 	
					'discrount_id' => $discrount_id, 	
					'modified_at' => $modified_at, 	
					'deleted_at' => $deleted_at, 	
					'product_code' => $product_code, 	
					'product_name' => $product_name, 	
					'customer_name' => $customer_name, 	
					'sale_price' => $sale_price, 	
					'brand_name' => $brand_name, 	
					'branch_location' => $branch_location, 	
					'category_name' => $category_name, 	
					'username' => $username, 
				);

				array_push($Salerr, $Saleitem);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $Salerr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}

	public function makeTransaction($data){
		// SAVE CUSTOMER DETAILS
		$customerDetails_id =false;
		if($this->checkCustomer($data['cemail']) == false){
			$customerDetails = array(
				"fname" => $data["fname"],
				"lname" => $data["lname"],
				"email" => $data["cemail"],
				"telephone"  => $data["telephone" ]
			);
			$customerDetails_id = $this->p_instance->Save("customer_tb", $customerDetails);

		}else{
			$customerDetails_id = $this->checkCustomer($data['cemail'])['customer_id'];
		}
		$saleInfo = [];
		$attendant_id = $data['attendant_id'];
		$payType = $data["cart_payment_types"];
		$discount = $data["cart_discrounts"];

		$purchase_ids = [];
		foreach($data['cart'] as $info){
			// SAVE SALE DETAILS
			$saleDetails = array(
				"product_id" => (int)$info["id"],
				"customer_id" => (int)$customerDetails_id,
				"quantity" => (int)$info["quantity"],
				"payment_type_id" => (int)$payType,
				"discrount_id" => (int)$discount,
				"attendant_id"  => (int)$attendant_id

			);
			$saleDetails_id = $this->p_instance->Save("sold_tb", $saleDetails);
			array_push($purchase_ids, (int)$saleDetails_id);
			// array_push($saleInfo, $saleDetails_id);
			// if($saleDetails_id){
			// 	$inventory = array(
			// 		'quantity' =>  (int)$info['available'] - (int)$info['quantity'], 
			// 		'status_id' =>  (((int)$info['available'] - (int)$info['quantity']) == 0) ? 1 : 3, 
			// 	);
			// 	// UPDATE INVENTORY QUANTITY AMD STATUS
			// 	$inventory_info = $this->p_instance->updateDetails('inventory_tb', 'inventory_id', (int) $info["inventory_id"], $inventory);
				
			// }
		}
		// GENERATE INVOICE NO.
		$invoice_no = '';
		foreach ($purchase_ids as $purchase_id) {
			$invoice_no .= $purchase_id . '|';
		}
		$ivno = array("invoice_no" => $invoice_no);
		// SAVE INVOICE NUMBER
		$returned_invoice_no = $this->p_instance->Save("invoice_tb", $ivno);
		// UPDATE INVOICE NUMBER IN SOLD TABLE 
		foreach ($purchase_ids as $purchase_id) {
			$Sold_tb_update = $this->p_instance->updateDetails('sold_tb', 'purchase_id', (int) $purchase_id, array('invoice_no' => $returned_invoice_no));
		}
		$date =  date('Y-m-d H:i:s');
		$invoice = array('date' => $date, 'invoiceNo' => $returned_invoice_no);

		if($customerDetails_id){
			// array_push($invoice)
			echo json_encode(array('response'=> "success", 'message' => $invoice));
		}else{
			echo json_encode(array('response'=> "success", 'message' => 'Operation failed'));
		}

	}

	private function checkCustomer($cemail){
		$userDetails = $this->p_instance->getDetails("SELECT * FROM customer_tb WHERE email = ?", array('email' => $cemail))->fetch(PDO::FETCH_ASSOC);
		return $userDetails;
	}

}
?>