<?php
// genre: (string) "none" | "fps" | "stg"
// demand/graphic: (int)
// demand/ai: (int)
// demand/single: (int)
// demand/multi_coop: (int)
// demand/multi_vs: (int)
// problem/text: (string)
// problem/kougai: (bool)
// problem/hanzai: (bool)
// problem/contents: (bool)
// problem/update: (bool)
// problem/other: (bool)
// evaluation: (int)
// freetext: (string)

//	if($_SERVER['REQUEST_METHOD'] !== 'POST')
//	    die();
// Test Code
$fp = fopen('test.json', 'r');
$fs = filesize('test.json');
$str = fread($fp, $fs);
fclose($fp);
$jsonA = json_decode($str);
foreach ($jsonA as $idx => $val) {
	$_POST[$idx] = $val;
}

$DEMANDS = array('graphic', 'ai', 'single', 'multi_coop', 'multi_vs');
$PROBLEMS = array('cont_amount', 'cont_quality', 'update', 'pagestyle', 'other');

// IPに対するユーザーIDを検索
define('QSTR_FINDUID', 'SELECT id FROM vl_user WHERE ip=?;');
// IPとホスト名にユーザーIDを付加
define('QSTR_ADDUSER', 'INSERT INTO vl_user(ip,host,agent) VALUES(?,?,?);');
// BANユーザーチェック
define('QSTR_CHKBAN', 'SELECT id FROM vl_ban_user WHERE id=?;');
// 評価の追加
define('QSTR_ADDREP', 'INSERT INTO '
		. 'vl_reputation(tr_id,evaluate,freetext) '
		. 'VALUES(:tr_id,:evaluate,:freetext);');
// 要求の追加
define('QSTR_ADDDEMAND', 'INSERT INTO '
		. 'vl_demand(tr_id,graphic,ai,single,multi_coop,multi_vs) '
		. 'VALUES(:tr_id, :graphic, :ai, :single, :multi_coop, :multi_vs);');
// 項目追加要求
define('QSTR_ADDENTRY', 'INSERT INTO '
	    . 'vl_add(tr_id,type,description) '
	    . 'VALUES(:tr_id,:type,:description);');
// 前回投票時刻を取得
define('QSTR_PREVTIME', 'SELECT date FROM vl_transaction ' 
	    . 'WHERE user_id=? ORDER BY date DESC LIMIT 1;');
define('QSTR_TRID', 'SELECT MAX(tr_id) FROM vl_transaction;');
define('QSTR_ADDTRANSACTION', 'INSERT INTO vl_transaction(user_id) '
		. 'VALUES(?);');

define('VOTE_INTERVAL', 1);

do {
	// connect MySQL database
	try {
		$pdo = new PDO('mysql:dbname=db0slice;host=127.0.0.1;', 'root', 'hexensql');
		// get userID (from Table or create)
		$st = $pdo->prepare(QSTR_FINDUID);
		if(!$st->execute(array($_SERVER[REMOTE_ADDR])))
//		$st->bindValue('chkip', );
//		if (!$st->execute())
			echo 'failed to query user';

		// get or create user-id
		$uid = $st->fetch(PDO::FETCH_COLUMN);
		if ($uid) {
			echo 'id found<br>';
			settype($uid, 'int');

			// check ban-user
			$st = $pdo->prepare(QSTR_CHKBAN);
			if (!$st->execute(array($uid)))
				die('failed to check ban user');

			if ($res = $st->fetch(PDO::FETCH_ASSOC))
				die('vote denied');
		} else {
			echo 'not found<br>';
			// create new userID
			$st = $pdo->prepare(QSTR_ADDUSER);
			if (!$st->execute(array($_SERVER[REMOTE_ADDR],
								gethostbyaddr($_SERVER[REMOTE_ADDR]),
								$_SERVER[HTTP_USER_AGENT])))
				echo 'failed to add user';

			$st = $pdo->prepare(QSTR_FINDUID);
			if (!$st->execute(array($_SERVER[REMOTE_ADDR])))
				echo 'failed to query user';
		}
		echo 'user id '.$uid.'<br>';
		
		// check previous vote time
		$st = $pdo->prepare(QSTR_PREVTIME);
		if (!$st->execute(array($uid)))
			dir('failed to query prevtime');
		$res = $st->fetch(PDO::FETCH_ASSOC);
		if ($res) {
			if(time() - strtotime($res[date]) < VOTE_INTERVAL)
				die('too many vote requests');
		}
		
		// add transaction entry
		$st = $pdo->prepare(QSTR_ADDTRANSACTION);
		if(!$st->execute(array($uid)))
			die('failed');
		$st = $pdo->query(QSTR_TRID);
		if(!$st->execute())
			die();
		$trid = $st->fetch(PDO::FETCH_COLUMN);
		settype($trid, 'int');

		// add demand entry
		$st = $pdo->prepare(QSTR_ADDDEMAND);
		foreach ($DEMANDS as $val) {
			$paramName = 'demand/' . $val;
			settype($_POST[$paramName], 'int');
			$st->bindValue($val, $_POST[$paramName], PDO::PARAM_INT);
		}
		if (!$st->execute())
			echo 'failed to post demand';

		// make problem flag
		$bit = 0x01;
		$problem_flag = 0;
		foreach ($PROBLEMS as $prob) {
			if (isset($_POST['problem/' . $prob]) == true)
				$problem_flag |= $bit;
			$bit <<= 1;
		}
		// add problem-other entry
		$addid = null;
		if(isset($_POST['problem/other'])) {
			$st = $pdo->query(QSTR_NEXTADDID);
			$addid = $st->fetch(PDO::FETCH_COLUMN);
			if(!settype($addid, 'int'))
				echo 'failed to get addID';
		}		
		// add reputation entry
		settype($uid, 'int');
		settype($demid, 'int');
		settype($_POST['evaluation'], 'int');
		$st = $pdo->prepare(QSTR_ADDREP);
		$st->bindValue('user_id', $uid, PDO::PARAM_INT);
		$st->bindValue('demand_id', $demid, PDO::PARAM_INT);
		$st->bindValue('problem', $problem_flag, PDO::PARAM_INT);
		$st->bindValue('evaluate', $_POST['evaluation'], PDO::PARAM_INT);
		$st->bindValue('add_id', $addid);
		$st->bindValue('freetext', $_POST['freetext']);
		if (!$st->execute())
			echo 'failed to post reputation';
		
		// add add-request entry
		$st = $pdo->query(QSTR_ADDENTRY);
		$st->bindValue('rep_id', $repid, PDO::PARAM_INT);
		$st->bindValue('type', 'problem');
		$st->bindValue('description', $_POST['problem/text']);
		if(!$st->execute())
			echo 'failed to post add-entry';

	} catch (PDOException $e) {
		echo $e->getMessage();
		break;
	} catch (Exception $str) {
		echo $str->getMessage();
		break;
	}
} while (false);
?>
