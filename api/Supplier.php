<?php  
class Supplier{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getSuppliers(){
		$result = $this->p_instance->fetchAll('supplier_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$supplierArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$supplier_item = array(
					'id' => $supplier_id,
					'name' => $lname. " ". $fname,
					'fname' => $fname,
					'lname' => $lname,
					'address' => $address,
					'telephone' => $telephone,
					'email' => $email,
					'created_at' => $created_at,
					'modified_at' => $modified_at,

				);

				array_push($supplierArr, $supplier_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $supplierArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>