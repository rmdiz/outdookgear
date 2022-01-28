<?php  
class Discount{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getDiscounts(){
		$result = $this->p_instance->fetchAll('discount_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$discountArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$discount_item = array(
					'id' => $discount_id,
					'name' => $discount_name,
					'desc' => $description,
					'created_at' => $created_at,
					'modified_at' => $modified_at,
					'delete_at' => $delete_at,
				);

				array_push($discountArr, $discount_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $discountArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>