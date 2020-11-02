<?php
	require( 'config.php' );
	header('Content-Type: text/javascript');
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysql_select_db(DB_NAME);


	if($_POST["username"]=='LOGOUT-COMMANND'){
    	session_start();
    	if(isset($_SESSION["USER_ID"])){
    		$sql ='CALL SP_LOG_EVENT(16,'.$_SESSION["USER_ID"].',4,null,null,null,\'User logged out.\');';
			mysql_query($sql);
    		unset($_SESSION["USER_ID"]);
    	}
    	session_destroy();
		die('"LOGGED OUT"');
	}

	// Check connection
	if (!$conn)
  	{
  		 die('"Could not connect to DB: ' . mysql_error().'"');
  	}

  	// Get salt
	$sql = 'SELECT `SALT`,`ID_USER` FROM TBL_USERS WHERE ACTIVE=1 AND USERNAME="'.$_POST["username"].'"';
	$result = mysql_query($sql);
	if (!$result) {
		//CALL SP_LOG_EVENT(event_id,user_id,object_type_id,object_id,new_status_id,new_stage_id,comm)
		$sql_log ='CALL SP_LOG_EVENT(15,0,4,null,null,null,\'Incorrect username "'.$_POST["username"].'"\');';
		mysql_query($sql_log);
    	die('"Incorrect user or password!"');
	}
	$salt = '';
	$USER_ID = '';
    while ($row = mysql_fetch_assoc($result)) {
        	$salt    = $row["SALT"];
        	$USER_ID = $row["ID_USER"];
    }
    if($USER_ID === null || $USER_ID == ''){
    	$sql_log ='CALL SP_LOG_EVENT(15,0,4,null,null,null,\'Incorrect username "'.$_POST["username"].'"\');';
		mysql_query($sql_log);
    }
    // Check password
    $saltedHash = md5($_POST["hash"].'+'.$salt);
    $sql = 'SELECT COUNT(ID_USER) AS AUTH FROM TBL_USERS WHERE ACTIVE=1 AND USERNAME="'.$_POST["username"].'" AND HASH="'.$saltedHash.'"';
	$result = mysql_query($sql);
	if (!$result) {
		//CALL SP_LOG_EVENT(event_id,user_id,object_type_id,object_id,new_status_id,new_stage_id,comm)
		$sql_log ='CALL SP_LOG_EVENT(15,'.$USER_ID.',4,null,null,null,\'Incorrect password for "'.$_POST["username"].'"\');';
		mysql_query($sql_log);
    	die('"Incorrect user or password!"');
	}
	$auth = '-1';
    while ($row = mysql_fetch_assoc($result)) {
        	$auth  = $row["AUTH"];
    }

    $output='';
	if($auth=='1'){
		
		if ( ! session_id() ) @ session_start();
		$sql = 'SELECT ID_USER AS USER_ID FROM TBL_USERS WHERE ACTIVE=1 AND USERNAME="'.$_POST["username"].'" AND HASH="'.$saltedHash.'"';
		$result = mysql_query($sql);
		if ($result) {
			$row = mysql_fetch_assoc($result);
			$_SESSION["USER_ID"]   = $row["USER_ID"];
			$_SESSION["USER_NAME"] = $_POST["username"];
			$output = '"Authorized"';
			//CALL SP_LOG_EVENT(event_id,user_id,object_type_id,object_id,new_status_id,new_stage_id,comm)
			$sql_log ='CALL SP_LOG_EVENT(1,'.$USER_ID.',4,null,null,null,\'Authorized. Username "'.$_POST["username"].'"\');';
			mysql_query($sql_log);
		}else{
			session_destroy();
			$output = '"Cannot retreive user details from the database."';
			//CALL SP_LOG_EVENT(event_id,user_id,object_type_id,object_id,new_status_id,new_stage_id,comm)
			$sql_log ='CALL SP_LOG_EVENT(15,'.$USER_ID.',4,null,null,null,\'Cannot retreive user details from the database. Username "'.$_POST["username"].'"\');';
			mysql_query($sql_log);
		}
	}else{
		$output = '"Not authorized"';
		$sql_log ='CALL SP_LOG_EVENT(15,'.$USER_ID.',4,null,null,null,\'Incorrect password or user is inactive. Username "'.$_POST["username"].'"\');';
		mysql_query($sql_log);
	}
	mysql_close($conn);
	echo $output;

?>