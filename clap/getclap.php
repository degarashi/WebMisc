<?php
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
		$ds = new DGSql('slice', 'root', 'hexensql');
		$ret = array();
		$count = 0;
		
		$limit = $_GET['limit'];
		$offset = $_GET['offset'];
		$limit = is_string($limit) ? (integer)$limit : 5;
		$offset = is_string($offset) ? (integer)$offset : 0;
		
		// 最新コメントをN件取得
		$ds->prepare('SELECT comment FROM clap WHERE comment IS NOT NULL ORDER BY time DESC LIMIT :offset, :limit;');
		$ds->setParam('limit', $limit);
		$ds->setParam('offset', $offset);
		$ds->execute(function($item) {
			foreach($item as $val) {
				global $ret, $count;
				$ret[] = $val;
				++$count;
			}
		});
		$ret['request_offset'] = $offset;
		$ret['n_recv_comment'] = $count;			// 取得したコメント件数

		// IP総数
		$itemIP = $ds->query('SELECT DISTINCT userID FROM clap;', NULL);
		$ret['ipcount'] = count($itemIP);
		// 拍手数
		$itemNC = $ds->query('SELECT COUNT(*) FROM clap;', NULL);
		$ret['count'] = $itemNC[0];
		// コメント総数
		$itemNCm = $ds->query('SELECT COUNT(*) FROM clap WHERE comment IS NOT NULL;', NULL);
		$ret['n_comment'] = count($itemNCm);
		
		// JSONP対応
		$jret = json_encode($ret);
		if(is_string($_POST['callback'])) {
			echo $_POST['callback'] . '(' . $jret;
			if(is_string($_POST['cb_param']))
				echo ',' . $_POST['cb_param'];
			echo ');';
		} else
			echo $jret;
	} catch(PDOException $e) {
		echo 'PDO Exception throwed!<br>' . $e->getMessage();
	} catch(Exception $e) {
		echo 'Exception throwed!<br>' . $e->getMessage();		
	}
?>