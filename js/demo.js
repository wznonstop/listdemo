window.onload = getContent();



//通过class获取元素
function getByClass(oParent,clsName){
	var oParent = document.getElementById(oParent);
	var classArr =[];
	var tagArr = oParent.getElementsByTagName("*");
	for(var i = 0, len = tagArr.length; i < len; i++){
		if (tagArr[i].className==clsName) {
			classArr.push(tagArr[i]);
		};
	}
	return classArr;
}


	/*获取内容*/
function getContent(){
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}else{
		request = new ActiveXObject("Microsoft XMLHTTP");
	};
	request.open("GET", "test.json");
	request.send();
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			var article = JSON.parse(request.responseText).data,
			len = article.length;
			var lists = getByClass("main","roll");
			var tits = getByClass("main", "listtit");
			for(var i = 0; i < len ; i++){
				tits[i].innerHTML = article[i].TITLE;
				lilen = article[i].LEN; 
				var pagecount = lilen;
				var ullist = document.createElement("ul");
				ullist.style.width = 1197 * lilen + "px";
				console.log(ullist.style.width);
				ullist.innerHTML = article[i].CONTENT;
				lists[i].appendChild(ullist);
			}

		};
	}
}


/*滑动列表*/
$(function(){
	var page = 1;
	$("a.rightarr").click(function(){
		var $parent = $(this).parents("div.list");
		var $rolllist = $parent.find("ul");
		var $listli = $rolllist.find("li");
		var pagecount = $listli.length;
		var liwidth = $listli.eq(0).width();
		if (!$rolllist.is(":animated")) {
			if (page == pagecount) {
				$rolllist.animate({left : "0px"}, "slow");
				page = 1;
			}else{
				$rolllist.animate({left : "-=" +liwidth}, "slow");
				page++;
			}
		};
	})
	$("a.leftarr").click(function(){
		var $parent = $(this).parents("div.list");
		var $rolllist = $parent.find("ul");
		var $listli = $rolllist.find("li");
		var pagecount = $listli.length;
		var liwidth = $listli.eq(0).width();
		if (!$rolllist.is(":animated")) {
			if (page == 1) {
				$rolllist.animate({left : "-="+liwidth*(pagecount-1)}, "slow");
				page = pagecount;
			}else{
				$rolllist.animate({left : "+=" +liwidth}, "slow");
				page--;
			}
		};
	})
})