<?php  
class Size{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getSize(){
		$result = $this->p_instance->fetchAll('size_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$sizeArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$size_item = array(
					'id' => $size_id,
					'name' => $size_label,
				);

				array_push($sizeArr, $size_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $sizeArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>