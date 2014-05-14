// JavaScript Document
var $page;

//加载底部菜单
function createFooter(page,id){
	var footerUrl = page.attr("data-footer");
	if (footerUrl) {
		var footerHtml = '';
		if (!footerHtml) {
			footerHtml = urlLoadContent(footerUrl);
			ss.setItem(footerUrl, footerHtml);
		}

		page.append(footerHtml);
		//alert($("#"+id+"Nav"));
		//$("#"+id+"Nav").attr("class","ui-btn-active ui-state-persist");
		var btnState =page.find('a[nid="'+id+'Nav"]');
		btnState.attr("class","ui-btn-active ui-state-persist");
		
		var nid = id+'Nav';
		page.find('div[data-role="navbar"] a').fastClick(function(){
			if($(this).attr("nid")!=null&&$(this).attr("nid")!=""){
				if($(this).attr("nid")!=nid){
				   var nurl = $(this).attr("nhref");
				  //var pid = $(this).attr("nid");
				   
				   var target_str = getPageHtml(nurl);
				  // alert(target_str);
				   var target = $("#frameContent");
				   var new_frame = $($.parseHTML(target_str));
				   var par = target.parent();
				   
				   var start = par.width();
			       new_frame.css('left', start);
			       target.after(new_frame);
			       target.imove(-start, 0, 200, function(){target.remove()});
        		   new_frame.imove(-start, 0, 200);
				   //target.imove(par.width(),0, 200,function(){target.remove()});
				   //goTo(nurl);
				   return false;
				}
			}
	    });
	} 
}

var pageCacheMap = new Map();
var nowPageId = "messagePage";
function getPageHtml(pageId){
	if(nowPageId==pageId){
		return;
	}
	nowPageId = pageId;
	//alert(pageCacheMap.getItem(pageId));
	if(pageCacheMap.getItem(pageId)!=null&&pageCacheMap.getItem(pageId)!=""){
	
		return pageCacheMap.getItem(pageId);
	}
	
    var html = template.render('templ_page_'+pageId);;// $(pageId).html();
    pageCacheMap.put(pageId,html);
    
	return html;
}

function refreshPageHtml(pageId){
	 
	 pageCacheMap.put(pageId,$("#indexPage").html());
}

function showNav(pageId){
	$('#indexPage div[data-role="navbar"] a').each(function(){
		$(this).removeClass("ui-btn-active");
		$(this).removeClass("ui-state-persist");
	});
	//alert("#"+pageId+"Nav");
	//$("#"+pageId+"Nav").attr("class","ui-btn-active ui-state-persist");
	 $("#"+pageId+"Nav").addClass("ui-btn-active");
	 $("#"+pageId+"Nav").addClass("ui-state-persist");
}



$(document).on("pagecreate", function(e) {
	$page = $(e.target);
	var pageId = $page.attr("id");
	if(pageId=="indexPage"){
		$page.find('div[data-role="navbar"] a').fastClick(function(){
					   
					   slideIn($(this).attr("id"));
	        		   //new_frame.imove(-start, 0, 200);
	        		   //alert(target.html());
					   //target.imove(par.width(),0, 200,function(){target.remove()});
					   //goTo(nurl);
		 });
		 
		$("#indexPage").bind('DOMNodeInserted', function(e) {
		 	  //refreshPageHtml(nowPageId);
		 	 // alert("==");
		     //alert('element now contains: ' + $(e.target).html());
		});
		 
	}
	
	//$page = $(e.target);
	//var pageId = $page.attr("id");
	//加载底部菜单
	//createFooter($page,pageId);
	//$.mobile.pageContainer.trigger("create");
	
	/*
	var navData = {
			    list: [
			    	{
			    		mtitle:"消息",
			    		icon:"alert",
			    		method:"getAllMessage",
			    		mid:"messagePage"
			    	},
			    	{
			    		mtitle:"设备列表",
			    		icon:"alert",
			    		method:"getAllMessage",
			    		mid:"shutdownPage"
			    	},
			    	{
			    		mtitle:"设备维修",
			    		icon:"alert",
			    		method:"getAllMessage",
			    		mid:"repairPage"
			    	},
			    	{
			    		mtitle:"设置",
			    		icon:"alert",
			    		method:"getAllMessage",
			    		mid:"setupPage"
			    	}
			    ]
 }

	var len = navData.list.length;
	for(var i=0;i<len;i++){
		$("#"+navData.list[i].mid+"Nav").fastClick(function(a){
				//alert(navData.list[i].method);
			     eval($(this).attr("method")+"()");
				 slideIn($(this).attr("id"));
		 });
		//alert(navData.list[i].mid);
	}
	
	*/
	
});

function slideIn(id){
	
	var FC = "frameContent";
	
	var nurl = $("#"+id).attr("nhref");
	var pid = replaceAll(nurl,"#","");
	
	showNav(pid);
					  
	var target_str = getPageHtml(pid);
    var target = $("#"+FC);
	var start = target.parent().width();
	var height = $(document).height();
	
    target.html(target_str).trigger("create");
    target.css("position","absolute");
    target.css("left",start);
    target.css("top",0);
    target.css("width",start);
    target.css("height","80%");
    target.css("background","");
    
    /*
    target.animate({"top":"0px","left":"0px"},600,function(){
    	//"height":$("#frameContent").parent().height()+1000+'px'
    	target.removeAttr("style");
    	//target.css("position","static");
    	target.css("marginTop",10);
    });
    */
    var callBack = function(){
    	target.removeAttr("style");
    	//target.css("position","static");
    	target.css("marginTop",10);
    }
    var b = new animate(FC, {"top":"0px","left":"0px"},300,callBack).play(); 
   
  // $("#frameContent").css("position","static");
   //$("#frameContent").css("height",$(document).height());
   
}

$(document).on("pagebeforeshow", function(e) {
	 showLoading();
});
 
 
 