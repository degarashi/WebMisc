<?php
	require('../dgsql.php');
	//! 投票モジュール管理クラス
	class DGVote extends DGBase {
		private $voteID;
		
		/*! @param $voteid 投票種別ID */
		public function __construct($db, $user, $pass, $ip, $voteid) {
			parent::__construct($db, $user, $pass, $ip);

			if(gettype($voteid) !== 'integer')
				throw new Exception('DGVote: wrong parameter');
			$this->voteID = $voteid;
		}
		//! 投票結果を受信
		/*! 既に投票済みの時は何もしない
			\retval $ret['is_voted'] 既に投票済みか(bool)
			\retval $ret[num]['count'] 得票数 (間に抜けがある時は0で埋められる)
			\retval $ret[num]['name'] 選択肢
			\retval $ret[n_choice]
		 */
		public function getVote() {
			// voteIDが等しい物をリストアップ
			$this->dgs->prepare('SELECT choose, COUNT(*) AS nVote FROM vote WHERE voteID=:voteid GROUP BY choose ORDER BY nVote DESC;');
			$this->dgs->setParam('voteid', $this->voteID);
			$nvote = $this->dgs->execute(null);
			
			// 選択肢テキストを取得
			$this->dgs->prepare('SELECT title,description,choiceText FROM voteInfo WHERE voteID=:voteid');
			$this->dgs->setParam('voteid', $this->voteID);
			$tmp = $this->dgs->execute(null);
			$ctext = explode('|', $tmp[0]['choiceText']);
			
			// 0で初期化
			$ret = array(title => $tmp[0]['title'],
						description => $tmp[0]['description']);
			for($i=0 ; $i<count($ctext) ; $i++) {
				$ret[$i] = array(name => $ctext[$i], count => 0);
			}
			// 得票数を記入していく
			foreach($nvote as $entry) {
				$ret[$entry['choose']]['count'] = (int)$entry['nVote'];
			}
			$ret['n_choice'] = count($ctext);
			
			// 投票済みフラグもついでに含める
			$ret['is_voted'] = $this->checkVote();
			return $ret;
		}
		//! IPが既に投票済みかどうか確認
		/*! \return 既に投票済か(bool) */
		public function checkVote() {
			$this->dgs->prepare('SELECT COUNT(*) AS count FROM vote WHERE userID=:userid AND voteID=:voteid;');
			$this->dgs->setParam('userid', $this->getUserID());
			$this->dgs->setParam('voteid', $this->voteID);
			$res = $this->dgs->execute(null);
			if(gettype($res[0]['count']) !== 'string' || ($bVoted=(int)$res[0]['count']) > 1)
				die('something wrong(in PHP)');

			return $bVoted == 1;
		}
		//! 投票する
		/*! \param $choose 選択肢の番号
			\return 成功の可否(bool) */
		public function sendVote($choose) {
			$this->dgs->prepare('INSERT INTO vote(userID,voteID,choose) VALUES(:userid, :voteid, :choose);');
			$this->dgs->setParams(array(
				userid => $this->getUserID(),
				voteid => $this->voteID,
				choose => $choose
			));
			$res = $this->dgs->execute(null);
			return $res == 1;
		}
	}
?>
