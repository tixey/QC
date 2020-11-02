<?php

//Checking that exectution of stored procedure is allowed -->
function SP_check($SP,$URL){
	$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) {
    	die('[{"REPLY":"ERROR","MESSAGE":"Connection failed: '. $conn->connect_error.'"}]');
    	return 'NOT_ALLOWED';
	}
	
	$SP  = mysqli_real_escape_string($conn, $SP);
	$URL = mysqli_real_escape_string($conn, $URL);

  	$sql='CALL SP_CHECK (\''.$SP.'\',\''.$URL.'\');';
  	$result  = $conn->query($sql);
  	$sp_name = '';
  	$active  = 0;
  	$auth    = 0;
  	if ($result) {
  		//$r = $result->fetch_array(MYSQLI_NUM);
		$r = $result->fetch_array(MYSQLI_ASSOC);
    	$sp_name = $r['SP_NAME'];
    	$active  = $r['ACTIVE'];
    	$auth    = $r['AU'];
	}
	
	$conn->close();
	if($active == 1){
		return array($sp_name, $auth);
	}else{
		return 'NOT_ALLOWED';
	}
	return 'NOT_ALLOWED';
}
//Checking that exectution of stored procedure is allowed <--


function execute_sp_post_update($SP_NAME){
	header('Content-Type: application/json');
	$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) {
    	die('[{"REPLY":"ERROR","MESSAGE":"Connection failed: '. $conn->connect_error.'"}]');
	}
	
	$par_array = explode(",", $_POST["PARAMS"]);
	$PARAMS ='';
	$count = 0;
	foreach ($par_array as $pr) {
		if($count>0){$PARAMS  .= ',';}
		if($_POST[$pr]==null){
			$PARAMS  .= 'null';
		}else{
    		$PARAMS  .= '\'' . mysqli_real_escape_string($conn, $_POST[$pr]) . '\'';
    	}
    	$count++;
	}
	if($SP_NAME[1]!=''){
		if($PARAMS ==''){
			$PARAMS = $SP_NAME[1]; // AU is set to 1 i.e. user id is required
		}else{
			$PARAMS .=',\''.$SP_NAME[1].'\''; // USER ID
		}
	}

  	$sql='CALL '.$SP_NAME[0].' ('.$PARAMS.');';
  	//echo $sql;
  	$result  = $conn->query($sql);

  	if ($result) {
		echo '[{"REPLY":"OK","MESSAGE":"Update/Insert successful!"}]';
		
	}else{
		die('[{"REPLY":"ERROR","MESSAGE":"Update/Insert failed!"}]');
	}
	$conn->close();
}

//Checking that exectution of stored procedure is allowed -->
function execute_sp_with_json_output($SP_NAME, $PAR){
	header('Content-Type: application/json');
	$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) {
    	die('[{"REPLY":"ERROR","MESSAGE":"Connection failed: '. $conn->connect_error.'"}]');
	}
	
	$par_array = explode(",", $PAR);
	$PARAMS ='';
	$count = 0;
	foreach ($par_array as $pr) {
		if($count>0){$PARAMS  .= ',';}
    	$PARAMS  .= '\'' . mysqli_real_escape_string($conn, $pr) . '\'';
    	$count++;
	}
	if($SP_NAME[1]!=''){ // AU is set to 1 i.e. user id is required
		if($PARAMS ==''){
			$PARAMS = $SP_NAME[1]; // USER ID
		}else{
			$PARAMS .=',\''.$SP_NAME[1].'\''; // USER ID
		}
	}

  	$sql='CALL '.$SP_NAME[0].' ('.$PARAMS.');';
  	
  	$result  = $conn->query($sql);

  	if ($result) {
  		//$r = $result->fetch_array(MYSQLI_NUM);
		/*while($r = $result->fetch_array(MYSQLI_ASSOC)) {
    		$rows[] = $r;
		}*/
		$rows = cast_query_results($result);
		echo json_encode($rows);
		
	}else{
		die('[{"EMPTY RESPONSE"}]');
	}
	
	$conn->close();
}
//Checking that exectution of stored procedure is allowed <--



function cast_query_results($result)
{
    $data = array();
    $fields = $result->fetch_fields();
    while ($row = $result->fetch_assoc()) {
      foreach ($fields as $field) {
        $fieldName = $field->name;
        $fieldValue = $row[$fieldName];
        if (!is_null($fieldValue))
        		/*
        	    1=>'tinyint',
			    2=>'smallint',
			    3=>'int',
			    4=>'float',
			    5=>'double',
			    7=>'timestamp',
			    8=>'bigint',
			    9=>'mediumint',
			    10=>'date',
			    11=>'time',
			    12=>'datetime',
			    13=>'year',
			    16=>'bit',
			    //252 is currently mapped to all text and blob types (MySQL 5.0.51a)
			    253=>'varchar',
			    254=>'char',
			    246=>'decimal'
			*/
            switch ($field->type) {
              case 3:
                $row[$fieldName] = (int)$fieldValue;
                break;
              case 8:
                $row[$fieldName] = (int)$fieldValue;
                break;
              case 4:
                $row[$fieldName] = (float)$fieldValue;
                break;
              // Add other type conversions as desired.
              // Strings are already strings, so don't need to be touched.
            }
      }
      array_push($data, $row);
    }

    return $data;
}


?>