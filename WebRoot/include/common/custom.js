// JavaScript Document
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
 
 

var FC = "frameContent";   //容器
var pageCacheMap = new Map();
var pageCacheHtmlMap = new Map();
var nowPageId = "messagePage";

function getPageHtml(pageId){
	 
	nowPageId = pageId;
	//alert(pageCacheMap.getItem(pageId));

	if(pageCacheMap.getItem(pageId)!=null&&pageCacheMap.getItem(pageId)!=""){
	  
	   return pageCacheMap.getItem(pageId);
	}
	
    var html = template.render('templ_page_'+pageId);// $(pageId).html();
    pageCacheMap.put(pageId,html);
    
	return html;
}
/**
 * 更新网页缓存
 * **/
function refreshPageCacheHtml(pageId){
	 
	 pageCacheHtmlMap.put(pageId,$("#indexPage").html());
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
	
 
	
	//$page = $(e.target);
	//var pageId = $page.attr("id");
	//加载底部菜单
	//createFooter($page,pageId);
	//$.mobile.pageContainer.trigger("create");
	
	/*
	$("#indexPage").bind('DOMNodeInserted', function(e) {
		 	  refreshPageHtml(nowPageId);
	});
	*/
	
});

/***
 * 页面进入效果
 * ***/
function slideIn(id,direct){
	var pid = -1;
	//alert(id.indexOf("Nav"));
	if(id.indexOf("HTML:")!=-1){
		
    }else{
		if(id.indexOf("Nav")==-1){
			if(id.indexOf("DIALOG:")==-1){
				if(id.indexOf("PAGE:")==-1){
					if(id.indexOf("PAGEBACK:")==-1){
						pid = id;
					}else{
						pid = replaceAll(id,"PAGEBACK:",""); 
					}
				}else{
				    pid = replaceAll(id,"PAGE:","");
				}
			}else{
				pid = replaceAll(id,"DIALOG:","");
			}
		    //location.hash="#"+pid;
		}else{
			var nurl = $("#"+id).attr("nhref");
			pid = replaceAll(nurl,"#","");
			
			showNav(pid);
		}
    }
	
	if(nowPageId==pid){  //如果是当前菜单 则不操作
		
		return false;
	}
	
	//如果有获取数据的方法 就立即执行
	if($("#"+pid+"Nav")){
		var ZXmethod = $("#"+pid+"Nav").attr("nmethod");
		 if(ZXmethod){
			 setTimeout(function(){
					 eval("javascript:"+ZXmethod+"();");
				 },0);	 
		 }
	}
	
	
	var target = $("#"+FC);
	var target_str = "";
	if(pid!=-1)
	  target_str = getPageHtml(pid);
	else
	  target_str = replaceAll(id,"HTML:","");
	 
	if(id.indexOf("DIALOG:")!=-1){
		dialog(target_str);
		return false;
	}else if(id.indexOf("PAGE:")!=-1){
		$("#myNav").css("display","none");
	}else if(id.indexOf("PAGEBACK:")!=-1){
		$("#myNav").css("display","");
	}
	
	
	var start = target.parent().width();
	var height = $(document).height();
    
    target.html(target_str).trigger("create");
    
    
    target.css("position","absolute");
    target.css("width",start+"px");
    target.css("height",(height*0.5)+"px");
    target.css("background","");
    if(!direct||direct=="left"){
    	target.css("top","5px");
    	target.css("left",start+"px");
    }else if(direct=="right"){
    	target.css("top","5px");
    	target.css("left",-start+"px");
    }else if(direct=="top"){
    	target.css("top",height+"px");
    	target.css("left","0px");
    }else if(direct=="down"){
    	target.css("top",-height+"px");
    	target.css("left","0px");
    }
   	
    	
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
    	target.css("marginTop",5);
    }
    var b = new animate(FC, {"top":"0px","left":"0px"},300,callBack).play(); 
}

function dialog(html){
	
	var h = '<div data-role="dialog"  id="myDialog">';
	h+= html;
	h+='</div>';
	
	$(document).append(html);
	$("#myDialog").html(h).trigger("create");
}

function goInit(){
 
}

$(document).ready(function(){
    	var len = navData.list.length;
		for(var i=0;i<len;i++){
			$("#"+navData.list[i].mid+"Nav").fastClick(function(a){
					//alert(navData.list[i].method);
				 	slideIn($(this).attr("id"));
			 });
			//alert(navData.list[i].mid);
		}
		
		//leftpanel
		$(document).on("swiperight",function(){
		     $('#message_lpBtn').click(); 
		}); 
});



$(document).on("pagebeforeshow", function(e) {
	 //showLoading();
});
 
$(document).on("pageshow", function(e) {
	 //hideLoading();
});
 
function reLogin(){
	 localStorage.removeItem("loginUserInfo");
	 goTo("include/login/login.html");
}
 
 