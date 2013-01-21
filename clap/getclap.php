<?php
	require('../loginfo.php');
	require('dgclap.php');

	/*	Web拍手の数pv/ipとコメントを取得
		arguments:
		$_POST['limit'] = 受け取るコメントの最大件数	(デフォルト: 5)
		$_POST['offset'] = 受け取るコメントのオフセット (デフォルト: 0)
			--- for JSONP ---
			$_POST['callback'] = コールバック関数名
			$_POST['cb_param'] = コールバックで一緒に返されるパラメータ
		returns:
		$ret[(number)] = コメント文
		$ret['count'] = 拍手カウント
		$ret['ipcount'] = IPカウント
		$ret['request_offset'] = リクエストされたオフセット
		$ret['n_recv_comment'] = 受信したコメント件数
		$ret['n_comment'] = コメント総数
	 */
	try {
		$clap = new DGClap($LOGIN_DB, $LOGIN_USER, $LOGIN_PASS, $_SERVER['REMOTE_ADDR']);
		
		$limit = $_POST['limit'];
		$offset = $_POST['offset'];
		$limit = is_string($limit) ? (integer)$limit : 5;
		$offset = is_string($offset) ? (integer)$offset : 0;

		$ret = $clap->getClap($offset, $limit);
		
		ReturnJSONP($ret);
	} catch(PDOException $e) {
		echo 'PDO Exception throwed!<br>' . $e->getMessage();
	} catch(Exception $e) {
		echo 'Exception throwed!<br>' . $e->getMessage();		
	}
?>