<?php  
class Category{

	function __construct($_p_instance){
		$this->p_instance = $_p_instance;
	}

	public function getCategories(){
		$result = $this->p_instance->fetchAll('category_tb');
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			$categoryArr = array();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$category_item = array(
					'id' => $category_id,
					'name' => $category_name,
					'desc' => $description,
					'created_at' => $created_at, 
					'modified_at' => $modified_at
				);

				array_push($categoryArr, $category_item);
			}
			// CONVERT OT JSON
			echo json_encode(array('response' => "success", 'message' => $categoryArr));
		}
		else{
			echo json_encode(array('response'=> "failed", 'message' => 'Nothing found'));
		}
	}
}
?>