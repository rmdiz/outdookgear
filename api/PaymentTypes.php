<?php  
class PaymentTypes{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getPaymentTypes(){
		$result = $this->p_instance->fetchAll('payment_type_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$payment_typeArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$payment_type_item = array(
					'id' => $payment_type_id,
					'name' => $name,
				);

				array_push($payment_typeArr, $payment_type_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $payment_typeArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>