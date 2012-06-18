
function RatioValue(values, sum, bInt) {
	this._bInt = bInt || false;
	this._value = values;
	
	// 合計値が指定されてなければ初期値の合計を適用
	this._calcAcSum();
	this._sum = sum || this._ac_sum;

	this._adjustValues(false);
}

RatioValue.prototype = {
	getValue: function(index) {
		return this._value[index];
	},
	_adjustValuesA: function(idx, sum) {
		// 配列に記載されたインデックスを平等に補正
		var ary = this._value;
		var ac_sum = 0;
		var cur = 0;
		for(var i=0 ; i<ary ; i++) {
			if(i == idx[cur]) {
				ac_sum += arg[i];
				if(++cur == idx.length)
					break;
			}
		}
		var r = ac_sum / sum;
		for(var i=0 ; i<idx.length ; i++)
			ary[idx[i]] *= r;
	},
	_calcAcSum: function() {
		this._ac_sum = 0;
		for(var i=0 ; i<this._value.length ; i++)
			this._ac_sum += this._value[i];
		if(this._bInt)
			this._ac_sum = Math.round(this._ac_sum);
	},
	// adjustValues()で半端になった各スロットの値を整数に丸める（合計値を保つ）
	_roundValues: function() {
		var 	acsum = this._ac_sum,
			sum = 0;
		var 	frac = Array(),
			ary = this._value,
			avg = this._ac_sum / ary.length;
		for(var i=0 ; i<ary.length ; i++) {
			var v = Math.round(ary[i]);
			if(v != ary[i]) {
				ary[i] = v;
				frac.push({index: i, dist: avg - v});
			}
			sum += v;
		}
		
		// 中央値方向に対しての距離で降順ソート
		frac.sort(function(a,b) {
			return a.dist > b.dist;
		});
		
		// 端数がなくなるまで中央値方向へ1ずつずらしていく
		var cur = 0;
		while(cur < frac.length && sum != acsum) {
			if(ary[frac[cur]] < avg) {
				++ary[frac[cur]];
				++sum;
			} else {
				--ary[frac[cur]];
				--sum;
			}
			++cur;
		}
	},
	// スロット間の合計値を調整
	_adjustValues: function (bForce) {
		// 限界値に満たなければ何もしない
		if(!bForce && this._ac_sum <= this._sum)
			return;
		
		var args = Array();
		for(var i=1 ; i<arguments.length ; i++)
			args.push(arguments[i]);

		var ary = this._value;
		var excSum = 0;
		var cur = 0;
		for(var i=0 ; i<ary.length ; i++) {
			if(args[cur] == i) {
				excSum += ary[i];
				++cur;
			}
		}

		cur = 0;
		var remain = this._sum - excSum;
		if(remain < 0) {
			// 例外スロットだけで限界を越えていたら通常スロットをすべて0に、例外スロットを平等に補正
			var r = this._sum / excSum;
			for(var i=0 ; i<ary.length ; i++) {
				if(args[cur] == i) {
					ary[i] *= r;
					++cur;
				} else
					ary[i] = 0;
			}
		} else {
			// 例外スロットの値は保持、通常スロットをremainで補正
			// excID以外のスロットが平等に影響を受ける
			var nmlSum = this._ac_sum - excSum;
			var r = remain / nmlSum;
			for(var i=0 ; i<ary.length ; i++) {
				if(args[cur] == i)
					++cur;
				else
					ary[i] *= r;
			}
		}
		this._ac_sum = this._sum;
		if(this._bInt)
			this._roundValues();
	},
	// 限界値を設定
	setSum: function(sum, bExpand) {
		if(this._bInt)
			sum = Math.round(sum);
		
		var prevSum = this._sum;
		this._sum = sum;
		// 限界値が現在の合計値より少ない場合
		// 又はフラグがセットされていたら値を調整
		if(bExpand ||
			(prevSum > sum &&
			this._ac_sum > sum))
		{
			this._adjustValues(bExpand);
		}
	},
	// 特定のスライダの値をセットしつつ、他の値を調整
	setValue: function(index, val) {
		if(this._bInt)
			val = Math.round(val);
		
		// 限界値チェック
		this._ac_sum = this._ac_sum + val - this._value[index];
		this._value[index] = val;
		// 他の値を補正
		var remain = this._sum - this._ac_sum;
		if(remain < 0)
			this._adjustValues(false, index);

		this._emitOnChangeValue();
	},
	_emitOnChangeValue: function() {
		if(typeof(this._cback) === "function")
			this._cback(this._value);
	},
	// 値変更時のコールバックを指定
	onChangeValue: function(cb) {
		this._cback = cb;
	}
}
/*$(function() {
	var test = new RatioValue([100,200,300], 200, true);
	test.setValue(0, 40);
	test.onChangeValue(function(val) {
		alert("value changed");
	});
	test.setValue(1, 200);
});*/

