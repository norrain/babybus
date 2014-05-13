var isAndroid = (/android/gi).test(navigator.appVersion);
var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
var isWebOS = (/webOS/gi).test(navigator.appVersion);

var IsDeviceReady = false;

function date2str(_x,y) { 
var x  = getDate(_x);
var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()}; 
y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)}); 
return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)}); 
} 

//显示loading
function showLoading(){
	//$.mobile.showPageLoadingMsg();
	 $.mobile.loading('show', {  
       text: '加载中...', //加载器中显示的文字
       textVisible: true, //是否显示文字
       theme: 'a',        //加载器主题样式a-e
       textonly: false,   //是否只显示文字
       html: ""//要显示的html内容，如图片等
   });  
} 
//隐藏loading
function hideLoading(){
   //$.mobile.hidePageLoadingMsg();
	$.mobile.loading('hide');  
} 

//退出
function exitApp(){
	onBackKeyDown();
}

//检查网络连接
function checkConnection() {
	var networkState =  navigator.network.connection.type;//navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknownconnection';//未知连接
	states[Connection.ETHERNET] = 'Ethernet connection';//以太网
	states[Connection.WIFI] = 'WiFi connection';//wifi
	states[Connection.CELL_2G]  = 'Cell 2Gconnection';//2G
	states[Connection.CELL_3G]  = 'Cell 3Gconnection';//3G
	states[Connection.CELL_4G]  = 'Cell 4Gconnection';//4G
	states[Connection.CELL] = 'Cell generic connection';//蜂窝网络
	states[Connection.NONE] = 'No network connection';
	
	 if (networkState == Connection.NONE) {
            showAlert('请连接网络', '没有网络连接');
     }
	 alert('Connection type: ' + states[networkState]);
}
//checkConnection();

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


window.do_confirm = function(str, config, cb) {
        if (typeof config == 'function') {
            cb = config;
            config = {};
        }
        var title = config['title'] || '教育装备管理',
            choice = config['choice'] || ["取消","确定"];

        if(isAndroid || isIDevice) {
            navigator.notification.confirm(str, cb, title, choice);
        } else {
            alert("貌似不支持");
        }
    }
do_confirm.OK = 2;
do_confirm.CANCEL = 1;



do_confirm('要取消关注吗', {title: '取消关注', choice: '否,是'},
                function(choice) {
                if (choice == do_confirm.OK) {
                     alert(choice);
                }
});

    
// 显示一个定制的确认对话框
function showConfirm(msg,onConfirmFun,title,btn) {
	//alert(msg+"--"+onConfirmFun+"--"+title+"---"+btn);
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
			showAlert("error:不支持确认对话框");
			
			//return onConfirmFun(window.confirm(msg));
		}
}

//模拟confirm
var confirm = function (content, title, response) {
    var html = "<div data-role='popup' id='mToast_confirm' data-theme='d' data-overlay-theme='b' style='max-width:340px;overflow:hidden;'><div class='ui-header ui-bar-a ui-corner-top'><h1 class='ui-title'>" + title + "</h1></div><div class='ui-content'><p></p>" + content + "<p></p><a data-role='button' data-inline='true' data-rel='back' data-mini='true'>取消</a><a id='mToast_confirm_response' data-role='button' data-theme='b' data-icon='check' data-inline='true' data-mini='true'>确定</a></div></div>",
     previous = $(".ui-popup-active div[data-role=popup]"),
     divConfirm = $("div#mToast_confirm");
    previous.popup('close');
    
    if (divConfirm.length > 0) {
        divConfirm.remove();
    }
    divConfirm = $(html).appendTo("div[data-role=page]:first");
    divConfirm.trigger('create')    // <-- 生成popup
        .trigger('refresh')
        .popup()
        .find("#mToast_confirm_response").on('fastClick', function () {
            divConfirm.popup('close');
            previous.popup('open');
            response();
        });
    divConfirm.popup('open');   // -->
};

/***
confirm('are you sure?', 'Confirm', function () {
    alert('sure');
});
**/

// 处理确认退出对话框返回的结果
function onConfirmExit(button) {
	 if(button){
	 	 navigator.app.exitApp();
	 	 localStorage.removeItem("loginUser");
	 }
}

//msg：提示内容，time:吐司延迟消失时间第(可以不写，不写默认1500毫秒延迟)
function Toast(msg, duration) {
	duration = isNaN(duration) ? 3000 : duration;
	var m = document.createElement('div');
	m.innerHTML = msg;
	m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:70%; left:20%; z-index:999999; font-weight:bold;";
	document.body.appendChild(m);
	setTimeout(function() {
		var d = 0.5;
		m.style.webkitTransition = '-webkit-transform ' + d
				+ 's ease-in, opacity ' + d + 's ease-in';
		m.style.opacity = '0';
		setTimeout(function() {
			document.body.removeChild(m)
		}, d * 1000);
	}, duration);
}


//BackButton按钮  
function onBackKeyDown(){  
	 alert("退回键");
	 var mainPage = new Array();
	 mainPage[0] = "#messagePage";
     mainPage[1] = "#shutdownPage";
     mainPage[2] = "#repairPage";
	 mainPage[3] = "#setupPage";
	
	 alert($.mobile.activePage);
	 for(var i=0;i<mainPage.length;i++){
		 if($.mobile.activePage.is(mainPage[i])){
		 	 alert("==");
			 showConfirm("您确定不再多留一会儿啦？",onConfirmExit);
			 return;
	     }
	 }
	 $.mobile.back();
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
	
	//showAlert("ddd"+id);
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


/**
 * replaceAll 方法实现
 * **/
 function  replaceAll(Astr,AFindText,ARepText){  
    var raRegExp = new RegExp(AFindText,"g");
    
	return Astr.replace(raRegExp,ARepText);
 }
 
function show_nav(navid){
        $('#header_nav li').each(function(){
        		//alert(this.className);
            	if(this.className.indexOf('ui-btn-active')!=-1){
            		this.className = this.className.replaceAll(" ui-btn-active","");
            	}
        });
       //alert(document.getElementById(navid).className);
       //var cn = document.getElementById(navid).className+"";
//       /document.getElementById(navid).className = cn +" ui-btn-active";
        //$("#"+navid).className = $("#"+navid).className+" ui-btn-active";
 }

 