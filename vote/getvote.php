<?php
	require('../loginfo.php');
	require('dgvote.php');

	//! 投票結果と自分が既に投票しているかを同時にチェック
	/*! arguments:
		$_POST['vote_id'] = voteID
		$_SERVER['REMOTE_ADDR'] = user IP
			--- for JSONP ---
			$_POST['callback'] = コールバック関数名
			$_POST['cb_param'] = コールバックで一緒に返されるパラメータ		
		returns:
		(boolean) 投票済みかのフラグ
		$ret['title'] = タイトル(string)
		$ret['choice'][num] = 選択肢(string) & num最大値が選択肢数
	*/
	if(gettype($_POST['vote_id']) !== 'string')
		throw new Exception('wrong parameter');
	
	$dgv = new DGVote($LOGIN_DB, $LOGIN_USER, $LOGIN_PASS, $_SERVER['REMOTE_ADDR'], (int)$_POST['vote_id']);
	$ret = $dgv->getVote();
	ReturnJSONP($ret);
?>