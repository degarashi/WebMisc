<?php
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
		$ds = new DGSql('slice', 'root', 'hexensql');
		$ip = $_SERVER['REMOTE_ADDR'];

		// ユーザーIDの取得 / 生成
		$ds->prepare('SELECT * FROM clap_user WHERE ip=:ip;');
		$ds->setParam('ip', $ip);
		$uid = -1;
		if($ds->execute(function($item) {
				global $uid;
				$uid = $item['userID'];
			}) === 0)
		{
			// ユーザーIDの登録
			$host = gethostbyaddr($ip);
			
			$ds->prepare('INSERT INTO clap_user(ip,host) VALUES(:ip, :host);');
			$ds->setParams(array('ip' => $ip,
									'host' => $host));
			$ds->execute(NULL);
			
			$ds->prepare('SELECT * FROM clap_user WHERE ip=:ip;');
			$ds->setParam('ip', $ip);
			$ds->execute(function($item) {
				global $uid;
				$uid = $item['userID'];
			});
		}
		
		// コメント書き込み
		$ds->prepare('INSERT INTO clap(userID,comment) VALUES(:uid, :comment);');
		$ds->setParams(array(
			'uid' => $uid,
			'comment' => $comment
		));
		$ds->execute(NULL);
		
		// JSONP対応
		if(is_string($_POST['callback'])) {
			echo $_POST['callback'] . '({}';
			if(is_string($_POST['cb_param']))
				echo ',' . $_POST['cb_param'];
			echo ');';
		}
	} catch(PDOException $e) {
		echo 'PDO Exception throwed!<br>' . $e->getMessage();
	} catch(Exception $e) {
		echo 'Exception throwed!<br>' . $e->getMessage();
	}
?>
