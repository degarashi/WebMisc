<?php
	require('../loginfo.php');
	require('dgclap.php');
	
	/*	arguments:
	 	$_POST['comment'] = comment-text (or NULL)
	 	$_SERVER['REMOTE_ADDR'] = user IP
			--- for JSONP ---
			$_POST['callback'] = コールバック関数名
			$_POST['cb_param'] = コールバックで一緒に返されるパラメータ
		returns:
		(nothing)
	*/
	$comment = $_POST['comment'];
	
	// 規定以上の文字数はカットする + HTMLタグはテキストに変換
	if(is_string($comment)) {
		$comment = substr(htmlspecialchars($comment), 0,MAX_COMMENT);
		if(!is_string($comment))
			$comment = null;
	}
	
	try {
		// connect MySQL database
		$clap = new DGClap($LOGIN_DB, $LOGIN_USER, $LOGIN_PASS, $_SERVER['REMOTE_ADDR']);
		$clap->sendClap($comment);
		
		ReturnJSONP(array());
	} catch(PDOException $e) {
		echo 'PDO Exception throwed!<br>' . $e->getMessage();
	} catch(Exception $e) {
		echo 'Exception throwed!<br>' . $e->getMessage();
	}
?>
