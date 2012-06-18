function WCentering(img, bScale) {
	var cx = window.innerWidth,
		cy = window.innerHeight;
	var w = parseInt(img.css("width")),
		h = parseInt(img.css("height"));
	
	if(bScale) {
		if(w>=cx || h>=cy) {}
		else {
			var scale = cx / w;
			if(h*scale >= cy)
				scale = Math.min(scale, cy/h);
			w *= scale;
			h *= scale;
		}
	}

	var posx = cx/2 - w/2,
		posy = cy/2 - h/2;
	img.css({
		position: "absolute",
		left: posx + "px",
		top: posy + "px",
		width: w + "px",
		height: h + "px"
	});
}
function MakeModal(obj, color, opa) {
	var body = $("body");
	var bg = $("<div>");
	bg
	.css({
		"background-color": color,
		"opacity": ""+opa,
		"position": "absolute",
		"left": "0px",
		"top": "0px",
		"width": "100%",
		"height": "100%",
		"z-index": "1"
	})
	.appendTo(body)
	.fadeIn("slow");
	
	obj
	.show()
	.ready(function(){
		WCentering(obj, false);
		obj.fadeTo(1,1000);
		
		$(window).resize(function(){
			WCentering(obj, false);
		});
	});	
	return bg;
}
/*
const SL_THUMB_CLASS = "Thumb",
	SL_RAIL_CLASS = "Rail";
function Slider(arg) {
	this.min = arg.min || 0;
	this.max = arg.max || 100;
	this.step = arg.step || 1;
	this.value = arg.value || (this.max-this.min)/2;
	
	this.obj = {
		"thumb": $("<div>", {
			"class": SL_THUMB_CLASS
		}),
		"rail": $("<div>", {
			"class": SL_RAIL_CLASS
		}),
		"arrow_min": 0,
		"arrow_max": 0,
		"meter": []
	};
	
	// 表示調整
}

const SLIDER_CLASSID = ".slider";
function PlaceSlider() {
	$(SLIDER_CLASSID).each(function(idx){
		$(this).replaceWith(new Slider($(this)));
	});
}
*/
$(function(){	
	$("#ShowVote").click(function(e){
		var btn = $(e.target);
		var body = $("body");
		btn.attr("disabled", "true");
		$.ajax({
				"error": function(xhr, status, e) {
					// ボタン復活
					alert("error occurred while loading page");
					btn.removeAttr("disabled");
				},
				"success": function(data, status, xhr) {
					var voteSheetR = $(data).appendTo(body).hide();
					var bg;
					setTimeout(function(){
						var vote = body.find("#Vote");
						bg = MakeModal(vote, "#000", 0.5);
						InitVoteSheet();
					},1);
					voteSheetR.find(".Cancel").click(function(){
						voteSheetR.remove();
						bg.remove();
						btn.removeAttr("disabled");
					});
				},
				"complete": function(xml, status) {},
				"dataType": "html",
				"url": "votesheet.html"
		});
	});
});
