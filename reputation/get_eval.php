<?php
	define('REFRESH_INTERVAL', 60);
	define('CACHE_NAME', 'test.cache');
	
	function MakeCache() {
		$cache = array();
		// 市長の評価(平均、分散、偏差値)
		$cache['eval'] = 0;
		// 問題点(すべて)
		$problem = array();
		$problem[] = array(100, 'コンテンツ量');

		$cache['problem'] = $problem;
		// 人口、前後比較
		$cache['hitcount'] = 0;
		
		$f = fopen(CACHE_NAME, 'w');
		fwrite($f, json_encode($cache));
		fclose($f);
	}

	// 評価を取得
	// キャッシュファイルの日付が古かったら削除
	chdir(dirname(__FILE__));
	$useCache = false;
	if(file_exists(CACHE_NAME)) {
		if((time() - filemtime(CACHE_NAME)) >= REFRESH_INTERVAL) {
			echo (time() - filemtime(CACHE_NAME)) . ':古いキャッシュ';
			unlink(CACHE_NAME);
		} else {
			echo 'キャッシュをそのまま使う';
			$useCache = true;
		}
	} else
		echo 'NO';
		
	if(!$useCache) {
		MakeCache();
	}
	$f = fopen(CACHE_NAME, 'r');
	$cache = fread($f, 1024);
	fclose($f);
	var_dump( json_decode($cache, true));
?>
