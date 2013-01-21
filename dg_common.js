// サーバーからJSONPにより取得する場合のコールバック関数
g_dgList = [];
g_dgUID = 0;
function RegDG(dg) {
	// 他のクラスと区別するために一意のIDを付加
	var uid = g_dgUID++;
	dg.uid = uid;
	g_dgList[uid] = dg;
}
// JSONP時のコールバック関数
function CB_DG(data, cbparam) {
	// cbparamはJSON形式
	var uid = parseInt(cbparam.uid, 10);
	// UIDから受信先のクラスを特定	
	var dg = g_dgList[uid];
	var func = dg.cbFunc[cbparam.cbid];
	dg.cbFunc[cbparam.cbid] = undefined;
	func.call(dg, data, cbparam);
}

function DGBase() {
	RegDG(this);
	
	this.cbFunc = {};
	this.cbid = 0;
}
DGBase.prototype._callPHP = function(url, param, callback, bJSONP) {
	this.cbFunc[this.cbid] = callback;
	var aux = {	uid: this.uid.toString(),
				cbid: this.cbid++ };
	if(bJSONP) {
		param.callback = "CB_DG";
		param.cb_param = JSON.stringify(aux);
		$.post(url, param, null, "jsonp");
	} else {
		$.post(url, param, function(data,status) {
			if(status === "success")
				CB_DG(data, aux);
		}, "json");
	}
};
