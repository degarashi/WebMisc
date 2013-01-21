<?php
	require('../dgsql.php');
	//! DGClapモジュール
	class DGClap extends DGBase {
		public function getClap($offset, $limit) {
			global $__ret, $__count;
			$__ret = array();
			$__count = 0;

			// 最新コメントをN件取得
			$this->dgs->prepare('SELECT comment FROM clap WHERE comment IS NOT NULL ORDER BY time DESC LIMIT :offset, :limit;');
			$this->dgs->setParam('limit', $limit);
			$this->dgs->setParam('offset', $offset);
			$this->dgs->execute(function($item) {
				foreach($item as $val) {
					global $__ret, $__count;
					$__ret[] = $val;
					++$__count;
				}
			});
			$__ret['request_offset'] = $offset;
			$__ret['n_recv_comment'] = $__count;			// 取得したコメント件数

			// IP総数
			$itemIP = $this->dgs->query('SELECT DISTINCT userID FROM clap;', NULL);
			$__ret['ipcount'] = count($itemIP);
			// 拍手数
			$itemNC = $this->dgs->query('SELECT COUNT(*) AS count FROM clap;', NULL);
			$__ret['count'] = $itemNC[0]['count'];
			// コメント総数
			$itemNCm = $this->dgs->query('SELECT COUNT(*) AS count FROM clap WHERE comment IS NOT NULL;', NULL);
			$__ret['n_comment'] = $itemNCm[0]['count'];
			
			return $__ret;
		}
		
		public function sendClap($comment) {
			// コメント書き込み
			$this->dgs->prepare('INSERT INTO clap(userID,comment) VALUES(:uid, :comment);');
			$this->dgs->setParams(array(
				'uid' => $this->getUserID(),
				'comment' => $comment
			));
			$this->dgs->execute(NULL);
		}
	}
?>