function browserLanguage() {
  try {
    return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
  }
  catch(e) {
    return undefined;
  }
}
const DEFAULT_LANG = "en";
const LANG_LIST = {
	"en": ".eng",
	"ja": ".jpn"
};

function MakeLangDiv(obj, user_lang) {
	var lobj = $(".lang", obj);
	for(var i=0 ; i<lobj.length ; i++) {
		var je = lobj.eq(i);
		var e = je.get(0);
		var res = e.innerHTML.match(/\[(\w+)\:([^\]]*)\]/g);
		if(res !== null) {
			for(var j=0 ; j<res.length ; j++) {
				var divtxt = res[j].match(/\[(\w+)\:([^\]]*)\]/);
				if(divtxt[1] === user_lang) {
					je.text(divtxt[2]);
/*					var ldiv = $("<span>", {
						"class": divtxt[1],
						"text": divtxt[2]
					});
					je.parent().append(ldiv);*/
					break;
				}
			}
		}
	}
}

function ConvertLang(obj) {
	var lang_elem = $();
	for(var idx in LANG_LIST)
		lang_elem = lang_elem.add(LANG_LIST[idx]);
	
	var code = browserLanguage() || DEFAULT_LANG;
	MakeLangDiv(obj, code);
}

