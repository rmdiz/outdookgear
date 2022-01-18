<?php  
class Products{

	function __construct($_db){
		$this->conn = $_db;
	}

	public function fetchAll($table){
		$query = "SELECT *
            FROM " . $table;
 
        // PREPARE QUERY STATEMENT
        $stmt = $this->conn->prepare( $query );
          
        // RUN/EXECUTE QUERY
        $stmt->execute();
     
        // RETURN RESULTS
        return $stmt;
	}
}
?>