<?php
	//! DGClapで用いる定数定義

	//! 最大コメント文字数
	define(MAX_COMMENT, 256);
	//! 変数型についてどのように変換するか
	$c_PDOCnvParam = array(
		'double' => function($value){ return (integer)$value; }
	);
	//! 変数型に付加するPDOフラグ
	$c_PDOCnvFlag = array(
		'boolean' => PDO::PARAM_BOOL,
		'string' => PDO::PARAM_STR,
		'double' => PDO::PARAM_INT,
		'integer' => PDO::PARAM_INT,
		'NULL' => PDO::PARAM_NULL
	);
?>