
FLAG_USEJSONP = true;
URL_SENDVOTE = "sendvote.php";
URL_GETVOTE = "getvote.php";

//! 投票の表示や送信
/*! \param[in] varea 投票フォームを表示させるためのdiv要素(jQuery) */
function DGVote(varea) {
	DGBase.call(this);
	
	// 使う予定のHTML要素を取得しておく
	this.varea = varea;
	this.voteID = varea.attr("id");
	
	var self = this;
	
	//! 投票結果を表示する
	function _initResult(data) {
		var varea = self.varea;
		var title = varea.find(".vote_Title");
		title.fadeTo("fast", 0, function() {
			var tex = title.text();
			title.text(tex + "<結果>").fadeTo("fast", 1);
			$("<div>", {
				"class": "vote_ResultArea"
			}).appendTo(varea);

			var nChoice = data.n_choice;
			var vote = [];
			var voteSum = 0;			
			for(var i=0 ; i<nChoice ; i++) {
				vote[i] = data[i].count;
				voteSum += vote[i];
			}
			// 得票数でソート
			vote.sort(function(a,b) {
				if(a > b)
					return -1;
				if(a < b)
					return 1;
				return 0;
			});

			var rar = $("<div>", {"class": "vote_ResultArea"}).appendTo(varea);
			// 選択肢の数だけバーを出す
			for(var i=0 ; i<nChoice ; i++) {
				// 選択肢バー
				var bar = $("<div>", {
					"class": "vote_ResultBar",
					text: data[i].name
				}).appendTo(rar);

				// グラフバーの外枠
				var gbarO = $("<div>", {
					"class": "vote_ResultBarOuter"
				}).appendTo(bar);

				// グラフバー (長さは得票数の割合で決める)
				var gbarI = $("<div>", {
					"class": "vote_ResultBarInner",
					width: "" + ((vote[i])/voteSum*98) + "%"
				}).appendTo(gbarO);

				// 得票数
				var vview = $("<div>", {
					"class": "vote_ResultVote",
					text: "" + vote[i]
				}).appendTo(bar);

				bar.slideUp(0).slideDown("fast");
			}
		});		
	}
	//! 表題と内容文を準備
	function _initBase(data) {
		var varea = self.varea;
		// 表題を追加
		$("<div>", {
			"class": "vote_Title",
			text: data.title}
		).appendTo(varea);

		// 内容文を追加
		$("<div>", {
			"class": "vote_Desc",
			text: data.description
		}).appendTo(varea);
	}
	//! 投票リストを読み込んで選択肢を表示する
	function _initVoteInfo(data) {
		if(data.is_voted)
			return false;
		
		var varea = self.varea;
		// 選択肢欄と追加
		var carea = $("<div>", {
			"class": "vote_ChoiceArea"
		}).appendTo(varea);
		
		// 選択肢を追加
		var cur = 0;
		var choice = new Array();
		while(typeof(data[cur]) !== "undefined") {
			choice[cur] = $("<div>", {"class": "vote_Choice"});
			$("<input>", {
				type: "radio",
				name: "choice",
				value: cur
			}).appendTo(choice[cur]);		
			choice[cur].append($("<span>", {text: data[cur].name}));

			++cur;
		}

		// 選択肢をシャッフルする
		var len = choice.length;
		for(var i=0 ; i<len-1 ; i++) {
			for(var j=i+1 ; j<len ; j++) {
				var idx = Math.floor(Math.random() * (len-j+1))+i;
				var tmp = choice[i];
				choice[i] = choice[idx];
				choice[idx] = tmp;
			}
		}
		for(var i=0 ; i<len ; i++)
			carea.append(choice[i]);

		// 投票ボタン
		var btn =  $("<button>", {"class": "vote_Send",
									text: "投票"});
		btn.click(
			// どれか1つチェックが入っているか？
			function() {
				var chk = carea.find("input:checked");
				if(chk.length === 1) {
					// 送信中の表示
					
					// Vote送信
					var choose = chk.eq(0).attr("value");
					self._callPHP(URL_SENDVOTE, {vote_id: self.voteID, choose_id: choose}, function(data) {
						// 処理を確認したら結果の表示
						// 選択肢類を欄外へ追い出す
						var obj = carea.find("div").add(btn);
						var len = obj.length;
						obj.each(function(index, elem) {
							var opt = {};
							if(index == len-1) {
								opt.complete = function() {
									carea.slideUp("fast");
									// 改めて問い合わせして結果表示
									self._callPHP(URL_GETVOTE, {vote_id: self.voteID}, _initResult, FLAG_USEJSONP);
								};
							}

							$(elem).delay(index*50).animate({
								left: "-200px"
							}, opt);
						});						
					}, FLAG_USEJSONP);
				}
			}
		).appendTo(carea);
		return true;
	}
	
	this._callPHP(URL_GETVOTE, {
		vote_id: this.voteID
	}, function(data) {
		_initBase(data);
		// 既に投票済みだったら結果を表示する
		if(!_initVoteInfo(data))
			_initResult(data);
	}, FLAG_USEJSONP);
}
DGVote.prototype = Object.create(DGBase.prototype);
DGVote.prototype.constructor = DGVote;

$(function() {
	var voteList = [];
	var varea = $(".vote_Area");
	varea.each(function(idx, elem) {
		voteList.push(new DGVote($(elem)));
	});	
});
