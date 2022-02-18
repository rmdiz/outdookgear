<?php  
class Status{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getStatus(){
		$result = $this->p_instance->fetchAll('status_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$statusArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$status_item = array(
					'id' => $status_id,
					'name' => $status_name,
				);

				array_push($statusArr, $status_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $statusArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>