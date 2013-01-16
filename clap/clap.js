// サーバーからJSONPにより取得する場合のコールバック関数
g_clapList = [];
g_clapUID = 0;
function CB_Clap(data, cbparam) {
	// cbparamはJSON形式
	var uid = parseInt(cbparam.uid, 10);
	// UIDから受信先のクラスを特定
	g_clapList[uid]._cbClap(data, cbparam);
}
function RegClap(dg) {
	// 他のクラスと区別するために一意のIDを付加
	var uid = g_clapUID++;
	dg.uid = uid;
	g_clapList[uid] = dg;
}

//! これをtrueにするとJSONPを使った通信となる
FLAG_USEJSONP = true;
//! 拍手送信時のURL
URL_SENDCLAP = "sendclap.php";
//! 拍手受信時のURL
URL_GETCLAP = "getclap.php";

//! 拍手の表示や送信
/*! @param[in] claparea 拍手を表示させる為のCanvas要素(JQuery形式) */
function DGClap(claparea) {
	// 使う予定のHTML要素を取得しておく
	this.clap = claparea.find("canvas");						// 表示領域
	this.form = claparea.find("form");							// コメント入力フォーム
	this.comment = this.form.find("input[type=text]");			// コメント入力欄
	this.send = this.form.find("input[type=button]");			// 拍手送信ボタン
	this.commentArea = claparea.find(".clap_CommentArea");		// コメント表示ウィンドウ
	this.opencomment = claparea.find(".clap_OpenComment");		// コメント表示ウィンドウを開くためのボタン
	this.commentOffset = claparea.find(".clap_CommentCounter");		// 表示中のコメント位置(オフセット)
	this.n_comment = claparea.find(".clap_NComment");				// コメントが全部で幾つあるか
	
	this.cbFunc = {};
	this.cbid = 0;

	RegClap(this);
	
	var self = this;
	//! Canvasに拍手数を描画する
	/*!	@param[in] data PHPで取得したJSONデータ */
	function _refreshCanvasValue(data) {
		canvas = self.clap.get(0);	// DOMElementを取得
		var ctx = canvas.getContext("2d");
		if(ctx) {
			ctx.clearRect(0,0, self.clap.attr("width"), self.clap.attr("height"));
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
					.css("border-style","solid")
					.css("border-width", "0px")
					.css("border-bottom-width", "1px")
					.css("border-color", "#ccc")
			);
		}
	};
	// GetClap問い合わせ
	function _refreshCanvas(commentOffset, commentMax, callback) {
		self.cbFunc[self.cbid] = callback;
		var aux = {uid: self.uid.toString(),
					cbid: self.cbid++};
		var param = { limit: commentMax,
						offset: commentOffset };
		if(FLAG_USEJSONP) {			
			param.callback = "CB_Clap";
			param.cb_param = JSON.stringify(aux);
			$.post(URL_GETCLAP, param, null, "jsonp");
		} else {
			// PHPでカウント数を取得して、処理完了と同時に表示を更新
			$.post(URL_GETCLAP, param,
				function(data, status){
					if(status === "success")
						CB_Clap(data, aux);
				},
				"json");
		}
	}
	// SendClapアクセス
	function _sendClap(cmt, callback) {
		self.cbFunc[self.cbid] = callback;
		var aux = {uid: self.uid.toString(),
					cbid: self.cbid++};
		var param = {comment: cmt};
		if(FLAG_USEJSONP) {
			param.callback = "CB_Clap";
			param.cb_param = JSON.stringify(aux);
			$.post(URL_SENDCLAP, param, null, "jsonp");
		} else {
			$.post(URL_SENDCLAP, param,
				function(data, status) {
					if(status === "success")
						CB_Clap(data, aux);
				},
				"json");
		}
	}
	// JSONP時のコールバック関数
	this._cbClap = function(data, aux) {
		// 拍手受信であれば表示を更新
		if(typeof(data.count) !== "undefined")
			_refreshCanvasValue(data);
		
		// コールバックを(あれば)ここで呼ぶ
		var cb = this.cbFunc[aux.cbid];
		if(typeof(cb) === "function") {
			cb();
			this.cbFunc[aux.cbid] = undefined;
		}
	};

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

DGClap.prototype = {};

$(function() {
	var clapList = [];
	var claparea = $(".clap_Area");
	claparea.each(function(idx, elem) {
		clapList.push(new DGClap($(elem)));
	});
});
