var isAndroid = (/android/gi).test(navigator.appVersion);
var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
var isWebOS = (/webOS/gi).test(navigator.appVersion);

var IsDeviceReady = false;


// 显示定制警告框
function showAlert(msg,title,btntext) {
	try{
		if(!title) title="温馨提示";
		if(!btntext) btntext="我知道了";
		if(navigator.notification && navigator.notification.alert){
   		navigator.notification.alert(
			msg,  // 显示信息
			alertDismissed, 
			title,            // 标题
			btntext            // 按钮名称
		);
		}else{
			alert(msg);
		}
	}catch(e){
		alert("Error:"+msg);
	}	
}


// 处理确认对话框返回的结果
function onConfirm(button) {
	alert('You selected button ' + button);
	
	return button==1;
}
	
// 显示一个定制的确认对话框
function showConfirm(msg,onConfirmFun,title,btn) {
	if(!onConfirmFun) onConfirmFun=onConfirm;
	if(!title) title='请选择：'
	if(!btn) btn='确定,取消';
		try{
			return navigator.notification.confirm(
				msg,  // 显示信息
				onConfirmFun,    // 按下按钮后触发的回调函数，返回按下按钮的索引	
				title,          // 标题
				btn          // 按钮标签
				);
		}catch(e){
			alert(e+"==========");
			return onConfirmFun(window.confirm(msg));
		}
}



function initAPP() {
	//if(!localStorage.getItem('firstCheck')||localStorage.getItem('firstCheck')!="true"){
		//location.href="include/welcome/wel.html";   //是第一次登录  就欢迎
	//}
}

// 处理确认退出对话框返回的结果
function onConfirmExit(button) {
	 if(button){
	 	 navigator.app.exitApp();
	 }
}

//BackButton按钮  
function onBackKeyDown(){  
	showAlert(location.href);
	showAlert($.mobile.activePage);
	showAlert("index:"+$.mobile.activePage.is('#homePage'));
	showAlert(" sbus:"+$.mobile.activePage.is('#search_bus'));
	showAlert("index1"+$.mobile.activePage.is('index1.html'));
	if($.mobile.activePage.is('#homePage')){
		  showAlert("===========");
		  showConfirm("您确定不再留一会儿啦？",onConfirmExit);
	}else{
		$.mobile.back();
	}
	//$.mobile.activePage.is('#page1')
}  

function onMenuKeyDown(){
	//window.location="#page4";
}
function onSearchKeyDown() { 
	//window.location="#page6";
}

try{
	document.addEventListener("deviceready", backKeyListener, false);
}catch(e){
	alert("deviceready:"+e);
}

function backKeyListener() {
	try{
    	document.addEventListener("backbutton", onBackKeyDown, false);
    }catch(e){
		alert("backKeyListener:"+e);
	}
} 


function onDeviceReady(id) {
	
	showAlert("ddd"+id);
	if(IsDeviceReady) 
		return;
	
	IsDeviceReady=true;
	
	//添加按钮事件 
	try {document.addEventListener("backbutton",onBackKeyDown,false); 	} catch (e) {alert();}
	//try {document.addEventListener("menubutton", onMenuKeyDown, false); } catch (e) {}
	//try {document.addEventListener("searchbutton", onSearchKeyDown, false); } catch (e) {}
 
	
}




//测试是否可以取到网络参数
var Request = new Array();
function loadQueryString(url) {
	
	var s = url.replace("#","&");
	var n = s.indexOf("?");
	if (n >= 0)
		s = s.substring(n + 1);
	var valuelist = s.split("&");
	for (var i = 0; i < valuelist.length; i++) {
		var pair = valuelist[i].split("=");
		if (pair.length > 1) {
			Request[pair[0].toLowerCase()] = pair[1];
		};
	};
};

if(window.location.href.indexOf("?")>0){
	loadQueryString(window.location.href);	
	notify=window.location.href;
	//alert(notify);
}


function roundNumber(num) {
	var dec = 3;
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}



function show_nav(id){
        $('#header_nav li').each(function(){
        	alert($(this).attr("id")+"=="+this.className);
            if ($(this).attr("id") != 'aNav') {
                this.className = $(this).attr("id") == id ? this.className+' ui-btn-active' : this.className;
            }
        });
 }
 
  