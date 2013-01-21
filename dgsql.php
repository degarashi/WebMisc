<?php
	require('constants.php');
	//! SQLのクエリを簡易化する
	class DGSql {
		private $pdo;		//!< 元になるPDOオブジェクト[PDO]
		private $st;		//!< 現在保持しているステートメント[PDOStatement]
		private $bFetch;	//!< 直前にフェッチ文をクエリしたか[bool]
		
		private function _callback($cb) {
			if($this->bFetch) {
				if(gettype($cb) === 'object') {
					$count = 0;
					while($item = $this->st->fetch(PDO::FETCH_ASSOC)) {
						$cb($item);
						++$count;
					}
					return $count;
				}
				return $this->st->fetchAll(PDO::FETCH_ASSOC);
			}
			return $this->st->rowCount();
		}
		private function _execute($param, $cb) {
			if(!$this->st)
				throw new Exception('not have any statements');
			$this->st->execute($param);
			return $this->_callback($cb);
		}
		private function _checkSelect($qstr) {
			$match = null;
			$res = preg_match('/^\s*(\w+)/', $qstr, $match);
			if($res !== 1)
				throw new Exception('invalid statement');
			$this->bFetch = strtoupper($match[1]) === "SELECT";
		}

		//! PDOを使用してMySqlに接続
		//! @param[in] $db[string] データベース名
		//! @param[in] $user[string] ユーザー名
		//! @param[in] $pass[string] パスワード
		public function __construct($db, $user, $pass) {
			$str = 'mysql:dbname=' . $db . ';host=127.0.0.1;charset=utf8;';
			$this->pdo = new PDO($str, $user, $pass);
			if(!$this->pdo)
				throw new Exception('coundn\'t initialize PDO object');
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		//! 内部にステートメントを持っているか
		//! @return[bool]
		public function haveStatement() {
			return (boolean)$this->st;
		}
		//! クエリ文を直接実行
		//! @param[in] $qstr[string]
		//! @param[in] $cb[function] コールバック関数
		public function query($qstr, $cb) {
			$this->clear();
			$this->st = $this->pdo->query($qstr);
			$this->_checkSelect($qstr);
			return $this->_callback($cb);
		}
		//! 引数付きステートメントを内部に用意
		//! @param[in] $qstr[string]
		public function prepare($qstr) {
			$this->st = $this->pdo->prepare($qstr);
			if(!$this->st)
				throw new Exception('failed to prepare statement');
			$this->_checkSelect($qstr);
		}
		//! 現在アクティブなステートメントに対して引数配列をセット
		//! @param[in] $entPair[array] 引数ペア配列
		public function setParams($entPair) {
			foreach($entPair as $idx => $val)
				$this->setParam($idx, $val);
		}
		//! 現在アクティブなステートメントに対して引数をセット
		//! @param[in] $entry[string]	エントリ名
		//! @param[in] $item[mixed]		設定する値
		public function setParam($entry, $item) {
			global $c_PDOCnvParam, $c_PDOCnvFlag;
			
			$type = gettype($item);
			$flag = $c_PDOCnvFlag[$type];
			$func = $c_PDOCnvParam[$type];
			if($func)
				$item = $func($item);
			
			$this->st->bindValue($entry, $item, $flag);
		}
		//! ステートメント実行
		//! @param[in] $cb[function]	コールバック (option)
		public function execute($cb) {
			return $this->_execute(NULL, $cb);
		}
		//! アクティブなステートメントをクリア
		public function clear() {
			$this->st = NULL;
		}
	}
	//! DGモジュール共通クラス
	class DGBase {
		protected $dgs;		//!< SQL操作に使うDGSql
		private $userID;	//!< データベース共通のユーザーID
		private $ip;		//!< ユーザーのIP文字列
		
		/*! @param $ip ユーザーIP文字列 */
		public function __construct($db, $user, $pass, $ip) {
			$this->dgs = new DGSql($db, $user, $pass);
			if(gettype($ip) !== 'string')
				throw new Exception('DGBase: wrong parameter');
			$this->ip = $ip;
			// ユーザーIDの取得
			$this->userID = $this->_regUserID();
		}
		//! ユーザーIDをIPから検索、無ければ新たに登録
		/*! @return userID */
		private function _regUserID() {
			$this->dgs = $this->dgs;
			// ユーザーIDの取得 / 生成
			$this->dgs->prepare('SELECT * FROM clap_user WHERE ip=:ip;');
			$this->dgs->setParam('ip', $this->ip);
			
			global $__uid;
			$__uid = -1;
			if($this->dgs->execute(function($item) {
					global $__uid;
					$__uid = $item['userID'];
				}) === 0)
			{
				// ユーザーIDの登録
				$host = gethostbyaddr($this->ip);

				$this->dgs->prepare('INSERT INTO clap_user(ip,host) VALUES(:ip, :host);');
				$this->dgs->setParams(array('ip' => $this->ip,
									'host' => $host));
				$this->dgs->execute(NULL);

				$this->dgs->prepare('SELECT * FROM clap_user WHERE ip=:ip;');
				$this->dgs->setParam('ip', $this->ip);
				$this->dgs->execute(function($item) {
					global $__uid;
					$__uid = $item['userID'];
				});
			}
			$this->userID = (int)$__uid;
			return $this->userID;
		}
		public function getUserID() {
			return $this->userID;
		}
	}
	//! JSONP対応
	function ReturnJSONP($ar) {
		$jret = json_encode($ar);
		if(is_string($_POST['callback'])) {
			echo $_POST['callback'] . '(' . $jret;
			if(is_string($_POST['cb_param']))
				echo ',' . $_POST['cb_param'];
			echo ');';
		} else
			echo $jret;		
	}
?>
