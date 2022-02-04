<?php  
class Model{

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


	public function signIn($username, $password){
		$query = "SELECT ut.*, utt.permissions, utt.user_type 
            FROM user_tb ut 
            JOIN user_type_tb utt 
            ON ut.user_type_id = utt.user_type_id  
            WHERE ut.username = '" . $username . "' and ut.password = '". $password . "'";

        // $sql= "SELECT * FROM `user_profile_image_tb` WHERE status_id = 3 AND user_id = "
 
        // PREPARE QUERY STATEMENTauthenticate
        $stmt = $this->conn->prepare( $query );
          
        // RUN/EXECUTE QUERY
        $stmt->execute();
     
        // RETURN RESULTS
        return $stmt;
	}

    public function Save($table, $fields = array()){
        $set = '';
        $x = 1;

        foreach ($fields as $name => $value) {
            $set .= "{$name} = ?";
            if ($x < count($fields)) {
                $set .= ', ';
            }
            $x++;
        }

        $sql = "INSERT INTO {$table} SET {$set}";

        // prepare query statement
        if($stmt = $this->conn->prepare($sql)){
            $x = 1;
            if (count($fields)) {
                foreach ($fields as $field) {
                    $stmt->bindValue($x, $field);
                    $x++;
                }
            }

            if($stmt->execute()){
                return $this->conn->lastInsertId();
            }
            printf('Error: %s', $stmt->error);
            return false;
        }
    }


    public function fetchSigle($table, $fields= array()){
        $set = '';
        $x = 1;

        foreach ($fields as $name => $value) {
            $set .= "{$name} = ?";
            if ($x < count($fields)) {
                $set .= ' AND ';
            }
            $x++;
        }
        $query = "SELECT * FROM $table WHERE $set";

 
        // prepare query statement
        if($stmt = $this->conn->prepare( $query )){
          $x = 1;
            if (count($fields)) {
                foreach ($fields as $field) {
                    $stmt->bindValue($x, $field);
                    $x++;
                }
            }
        }
        // return $stmt;
        if($stmt->execute()){
            return $stmt;
        }
        printf('Error: %s', $stmt->error);
        return false;
    }

    public function getDetails($query,  $fields= array()){
 
        // // prepare query statement
        // $stmt = $this->conn->prepare( $query );
          
        // // execute query
        // $stmt->execute();
     
        // // return values
        // return $stmt;
        if($stmt = $this->conn->prepare( $query )){
          $x = 1;
            if (count($fields)) {
                foreach ($fields as $field) {
                    $stmt->bindValue($x, $field);
                    $x++;
                }
            }
        }
        // return $stmt;
        if($stmt->execute()){
            return $stmt;
        }
        printf('Error: %s', $stmt->error);
        return false;
    }

    
     // update deteils
    function updateDetails($table, $fieldname, $fieldvalue, $fields = array()){
        $set = '';
        $x = 1;

        foreach ($fields as $name => $value) {
            $set .= "{$name} = ?";
            if ($x < count($fields)) {
                $set .= ', ';
            }
            $x++;
        }

        $sql = "UPDATE {$table} SET {$set} WHERE {$fieldname} = {$fieldvalue}";

        // prepare query statement
        if($stmt = $this->conn->prepare($sql)){
            $x = 1;
            if (count($fields)) {
                foreach ($fields as $field) {
                    $stmt->bindValue($x, $field);
                    $x++;
                }
            }

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }

    // read products by search term
    public function search($table, $search_term, $search_field, $from_record_num, $records_per_page){
     
        // select query
        $query = "SELECT *
                    FROM
                        {$table}
                    WHERE
                        $search_field LIKE ? 
                    LIMIT
                        {$from_record_num}, {$records_per_page}";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
        $search_term = "%{$search_term}%";
        $stmt->bindParam(1, $search_term);
     
        // execute query
        $stmt->execute();
     
        // return values from database
        return $stmt;
    }
     
    public function countAll_BySearch($table, $search_term, $search_field){
     
        // select query
        $query = "SELECT
                    COUNT(*) as total_rows
                FROM
                    " . $table . " 
                WHERE
                    $search_field LIKE ? 
                    AND status = 'Vacant'";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
        $search_term = "%{$search_term}%";
        $stmt->bindParam(1, $search_term);
          
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        return $row['total_rows'];
    }
     // used for paging
    public function countAll($table, $search_field){
     
        // query to select all user records
        $query = "SELECT ".$search_field." FROM " . $table . "";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        // get number of rows
        $num = $stmt->rowCount();
     
        // return row count
        return $num;
    }

     // update deteils
    public function saveDetails($table, $fields = array()){
        $set = '';
        $x = 1;

        foreach ($fields as $name => $value) {
            $set .= "{$name} = ?";
            if ($x < count($fields)) {
                $set .= ', ';
            }
            $x++;
        }

        $sql = "INSERT INTO {$table} SET {$set}";

        // prepare query statement
        if($stmt = $this->conn->prepare($sql)){
            $x = 1;
            if (count($fields)) {
                foreach ($fields as $field) {
                    $stmt->bindValue($x, $field);
                    $x++;
                }
            }

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }

    function delete(){
        // get record ID
        // isset() is a PHP function used to verify if a value is there or not
        $stm=isset($_GET['stm']) ? $_GET['stm'] : die('ERROR: Record ID not found.');
     
        // delete query
        $query = "DELETE FROM disease_details_tb WHERE id = ?";
        $stmt = $con->prepare($query);
        $stmt->bindParam(1, $stm);
         
        if($stmt->execute()){
            // redirect to read records page and 
            // tell the user record was deleted
            header('Location: index.php?delete=deleted');
        }else{
            die('Unable to delete record.');
        }
    }


}
?>