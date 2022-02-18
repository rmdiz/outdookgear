<?php  
class Brand{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getBrands(){
		$result = $this->p_instance->fetchAll('brand_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$brandArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$brand_item = array(
					'id' => $brand_id,
					'name' => $brand_name, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at
				);

				array_push($brandArr, $brand_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $brandArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>