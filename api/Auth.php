<?php  
class Auth{

	function __construct($_m_instance){
		$this->m_instance = $_m_instance;
	}

	public function authenticate($username, $password){
		$result = $this->m_instance->signIn($username, $password);
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		if($num > 0){
			echo json_encode(array('response' => 'success', 'message' => $result->fetch(PDO::FETCH_ASSOC)));
		}
		else{
			echo json_encode(array('response' => "failed", 'message' => 'Invalid username or password'));
		}

	}
}
?>