<?php
	require('../loginfo.php');
	require('dgvote.php');
	
	//! 投票を行う。もし手違いで既に投票していたら何もしない
	/*! arguments:
		$_POST['vote_id'] = voteID
		$_POST['choose_id'] = chooseID
	 */
	if(gettype($_POST['vote_id']) !== 'string' ||
		gettype($_POST['choose_id']) !== 'string')
		throw new Exception('wrong parameter');
	
	$dgv = new DGVote($LOGIN_DB, $LOGIN_USER, $LOGIN_PASS, $_SERVER['REMOTE_ADDR'], (int)$_POST['vote_id']);	
	$dgv->sendVote((int)$_POST['choose_id']);
	ReturnJSONP(array());
?>
