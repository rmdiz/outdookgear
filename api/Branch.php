<?php  
class Branch{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getBranches(){
		$result = $this->p_instance->fetchAll('branch_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$branchArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$branch_item = array(
					'id' => $branch_id,
					'name' => $branch_location,
				);

				array_push($branchArr, $branch_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $branchArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>