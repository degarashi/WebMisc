
//! これをtrueにするとJSONPを使った通信となる
FLAG_USEJSONP = true;
//! 拍手送信時のURL
URL_SENDCLAP = "sendclap.php";
//! 拍手受信時のURL
URL_GETCLAP = "getclap.php";

//! 拍手の表示や送信
/*! @param[in] claparea 拍手を表示させる為のCanvas要素(JQuery形式) */
function DGClap(claparea) {
	DGBase.call(this);
	
	// 使う予定のHTML要素を生成しておく

	// 表示領域
	this.clap = $("<canvas width='128' height='24'>", {
		text: "お使いのブラウザがCanvasに対応していない様です"
	}).appendTo(claparea);
	
	// コメント入力フォーム
	this.form = $("<form>", {
		action: "#"
	}).appendTo(claparea);
	
	// コメント入力欄
	this.comment = $("<input>", {
		type: "text"
	}).appendTo(this.form);
	
	// 拍手送信ボタン
	this.send = $("<input>", {
		type: "button",
		value:"拍手を送信"
	}).appendTo(this.form);
	
	$("<hr>").appendTo(claparea);
	
	// コメント表示ウィンドウ
	this.commentArea = $("<div>", {
		"class": "clap_CommentArea"
	}).appendTo(claparea);
	
	// コメント表示ウィンドウを開くためのボタン
	this.opencomment = $("<button>", {
		"class": "clap_OpenComment",
		text: "コメントを表示"
	}).appendTo(claparea);
	
	// 表示中のコメント位置(オフセット)
	this.commentOffset = $("<div>", {
		"class": "clap_CommentCounter"
	}).appendTo(this.commentArea);
	
	// コメントが全部で幾つあるか
	this.n_comment = claparea.find(".clap_NComment");
	
	var self = this;
	//! Canvasに拍手数を描画する
	/*!	@param[in] data PHPで取得したJSONデータ */
	function _refreshCanvasValue(data) {
		var clap = self.clap;
		var canvas = clap.get(0);	// DOMElementを取得
		var ctx = canvas.getContext("2d");
		if(ctx) {
			ctx.clearRect(0,0, clap.attr("width"), clap.attr("height"));
			// 拍手数の描画
			var ox = 16,
				oy = 14;
			var txt = "拍手";
			ctx.font = "bold 12px 'Arial'";
			var tm = ctx.measureText(txt);
			ctx.fillText(txt, ox, oy);

			var nClap = data.count,
				nIP = data.ipcount;
			
			ctx.lineWidth = 1;
			ctx.lineCap = "butt";
			ctx.lineJoin = "miter";

			ctx.fillText(" " + nClap + "(" + nIP + "ip)", ox+tm.width+2, oy);
			
			ctx.beginPath();
			ctx.moveTo(0,10);
			ctx.lineTo(10, 10);
			ctx.lineTo(18,18);
			ctx.lineTo(116,18);
			ctx.stroke();
		}
		// コメントの更新
		self.commentArea.find(".clap_Comment").remove();		
		var cur = 0;
		for(;;) {
			var item = data[cur++];
			if(typeof(item) !== "string")
				break;
			self.commentArea.append(
				$("<div>", {text: item, "class":"clap_Comment"})
			);
		}
	};
	// GetClap問い合わせ
	function _refreshCanvas(commentOffset, commentMax, callback) {
		var param = { limit: commentMax,
						offset: commentOffset };
		// PHPでカウント数を取得して、処理完了と同時に表示を更新
		self._callPHP(URL_GETCLAP, param, function(data,aux) {
			_refreshCanvasValue(data);
			// コールバックを(あれば)ここで呼ぶ
			if(typeof(callback) === "function")
				callback();
		}, FLAG_USEJSONP);
	}
	// SendClapアクセス
	function _sendClap(cmt, callback) {
		var param = {comment: cmt};
		self._callPHP(URL_SENDCLAP, param, callback, FLAG_USEJSONP);
	}

	// とりあえずダミーのデータを表示しておく
	_refreshCanvasValue({
		n_comment: 0,
		count: 0,
		ipcount: 0
	});
	_refreshCanvas(0,5);
	
	var default_inp = "コメント欄(オプション)";
	this.comment.val(default_inp).css("color", "#aaa");
	// sendがクリックされたらAjaxで送信
	this.send.bind("click", function(e) {
		// コメント文章を取得
		var cmt = self.comment.val();
		// もしコメントがデフォルト文章なら空欄を意味する
		cmt = cmt===default_inp ? "" : cmt;
		_sendClap(cmt, function() {
					var form = self.form;
					var str = "送信成功";
					var qstr = $("<span>", {text: str})
								.css("vertical-align", "middle")
								.css("padding", "4px");
					form.fadeOut("normal", function() {
						$(this).replaceWith(qstr);
							qstr.fadeOut(0)
								.fadeIn("normal", function() {
									$(this).delay(2000).fadeOut("slow",
										function() {
											//! TODO: あとでajax関数で失敗時の処理を足す
											if(true) {
												// 拍手数を更新
												_refreshCanvas(0,5);
											} else {
												// もう一度コメント欄を出す
												qstr.replaceWith(form);
												form.fadeIn("normal");
											}
										}
									);
								});
					});
				}
		);
	});
	
	this.comment.bind("focus", function(e) {
		// コメント欄の文字色を黒に変更
		var ci = $(e.target); 
		ci.css("color", "#000");
		// コメント空欄時の文章が表示されていたらそれを消去
		if(ci.val() === default_inp)
			ci.val("");
	});
	this.comment.bind("blur", function(e) {
		var ci = $(e.target); 
		// コメント欄が空だったらデフォルト文章を表示
		if(ci.val() === "") {
			// コメント欄の文字色を薄くする
			ci.css("color", "#aaa");
			ci.val(default_inp);
		}
	});
	this.commentArea.slideUp(0);
	
	// 簡単の為、拍手カウント取得とコメント文取得のPHPは同じにする
	// とりあえず最新のコメント5件を表示。毎回問い合わせする

	// コメント入力欄でエンターが押されたら送信
	this.comment.bind("keydown", function(e) {
		if(e.type === "keydown" && e.which === 13)
			self.send.trigger("click");
	});
	// コメント表示ボタンが押された時のイベント
	this.opencomment.toggle(
		function() {
			_refreshCanvas(0,5, function() {
				self.commentArea.slideDown("fast");
				self.opencomment.text("コメントを非表示");
			});
		},
		function() {
			self.commentArea.slideUp("fast");
			self.opencomment.text("コメントを表示");
		}
	);
}
DGClap.prototype = Object.create(DGBase.prototype);
DGClap.prototype.constructor = DGClap;

$(function() {
	var clapList = [];
	var claparea = $(".clap_Area");
	claparea.each(function(idx, elem) {
		clapList.push(new DGClap($(elem)));
	});
});
