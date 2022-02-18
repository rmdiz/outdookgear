<?php  
class Auth{

	function __construct($_m_instance){
		$this->m_instance = $_m_instance;
	}

	public function authenticate($username, $password){
		$result = $this->m_instance->signIn($username, $password);
		// GET NUMBER OF ROWS
		$num = $result->rowCount();
		$result =$result->fetch(PDO::FETCH_ASSOC);
		$userimage = "default.png";
		$branch = null;
		if($num > 0){
			$images = $this->m_instance->getDetails("SELECT * FROM `user_profile_image_tb` WHERE status_id = 3 AND user_id = ?",  $fields= array('user_id' => (int) $result['user_id']));
			if($images = $images->fetch(PDO::FETCH_ASSOC)){
				$userimage = $images['image'];
			}
			$attendant = $this->m_instance->getDetails("SELECT att.*, bt.branch_location FROM attendant_tb att JOIN branch_tb bt ON att.branch_id = bt.branch_id WHERE  att.user_id = ?",  $fields= array('user_id' => (int) $result['user_id']));
			if($attendant = $attendant->fetch(PDO::FETCH_ASSOC)){
				$branch = $attendant['branch_location'];
			}
			$userD = array(
				"address" => $result['address'],
				"created_at" => $result['created_at'],
				"deleted_at" => $result['deleted_at'],
				"email" => $result['email'],
				"first_name" => $result['first_name'],
				"last_name" => $result['last_name'],
				"modified_at" => $result['modified_at'],
				"permissions" => $result['permissions'],
				"telephone" => $result['telephone'],
				"user_id" => $result['user_id'],
				"user_type" => $result['user_type'],
				"user_type_id" => $result['user_type_id'],
				"username" => $result['username'],
				"image" => $userimage,
				"branch" => $branch
			);
			echo json_encode(array('response' => 'success', 'message' => $userD));
		}
		else{
			echo json_encode(array('response' => "failed", 'message' => 'Invalid username or password'));
		}

	}
}
?>