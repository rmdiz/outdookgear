
<?php  
class Color{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getColors(){
		$result = $this->p_instance->fetchAll('colour_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$colorArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$color_item = array(
					'id' => $colour_id,
					'name' => $colour_name, 
					'created_at' => $created_at, 
					'modified_at' => $modified_at, 
					'deleted_at' => $deleted_at,
					'available' => $this->getAvailableColors()
				);

				array_push($colorArr, $color_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $colorArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}

	public function getAvailableColors(){
		$sql = "
			SELECT vi.product_id, cr.*  FROM `inventory_tb` vi LEFT OUTER JOIN product_tb pt ON vi.product_id = pt.product_id LEFT OUTER JOIN colour_tb cr ON cr.colour_id = pt.colour_id WHERE vi.status_id = ?
			";
		$result = $this->p_instance->getDetails($sql, array('vi.status_id' => 3));
		$num = $result->rowCount();
		if($num > 0){
			$colorArr = array();
			$counter = 1;
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);
				if(!in_array($colour_name, $colorArr)){
					array_push($colorArr, $colour_name);
				}
			}
			$data = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				// if(in_array($colour_name, $colorArr)){
				    $data[$colour_name]['counter'] = $data[$colour_name][$counter];
				// }
				// $counter++;
				array_push($colorArr, $data);
			}
			
			return $data;
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $colorArr));
		}
		return "Operation failed";


	}
}
?>