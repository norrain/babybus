var isAndroid = (/android/gi).test(navigator.appVersion);
var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
var isWebOS = (/webOS/gi).test(navigator.appVersion);

var IsDeviceReady = false;

//全局配置
var global = {
	WEBSITE : "http://xxx.com/",
	serverURL:""
}

//localStorage缓存
var ls = {
	setItem : function(key, value) {
		localStorage.setItem(key, value)
	},
	getItem : function(key) {
		return localStorage.getItem(key)
	}
}

//sessionStorage缓存
var ss = {
	setItem : function(key, value) {
		sessionStorage.setItem(key, value)
	},
	getItem : function(key) {
		return sessionStorage.getItem(key)
	}
}

function ajaxData(exeMethod){
	$.ajax({
			async : false,
			url : global.serverURL + '?em='+exeMethod, // 跨域URL
			type : 'get',
			dataType : 'jsonp',
			jsonp : 'jsoncallback', //默认callback
			data : params,
			timeout : 5000,
			beforeSend : function() { //jsonp 方式此方法不被触发。原因可能是dataType如果指定为jsonp的话，就已经不是ajax事件了
				showLoading();
			},
			success : function(json) { //客户端jquery预先定义好的callback函数，成功获取跨域服务器上的json数据后，会动态执行这个callback函数 
				 desplay(json);
			},
			complete : function(XMLHttpRequest, textStatus) {
								//alert(textStatus);
								
			},
			error : function(xhr) {//请求出错处理 
				 showAlert("请求出错(请检查相关度网络状况.)");
		    }
	 });
}

function jsonObject(jsonstr){
	//return eval("("+jsonstr+")");
	return (new Function('return ' + jsonstr))();
}

//页面刷新
function pageRefresh() {
	$.mobile.pageContainer.trigger("create");
}

//转到页
function goTo(page) {
	$.mobile.changePage(page, {
				transition : "none"
			});
}

//显示loading
function showLoading() {
	//$.mobile.showPageLoadingMsg();
	$.mobile.loading('show', {
				text : '加载中...', //加载器中显示的文字
				textVisible : true, //是否显示文字
				theme : 'b', //加载器主题样式a-e
				textonly : false, //是否只显示文字
				html : ""//要显示的html内容，如图片等
			});
}
//隐藏loading
function hideLoading() {
	//$.mobile.hidePageLoadingMsg();
	$.mobile.loading('hide');
}

//退出
function exitApp() {
	onBackKeyDown();
}

//检查网络连接
function checkConnection() {
	var networkState = navigator.network.connection.type;//navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknownconnection';//未知连接
	states[Connection.ETHERNET] = 'Ethernet connection';//以太网
	states[Connection.WIFI] = 'WiFi connection';//wifi
	states[Connection.CELL_2G] = 'Cell 2Gconnection';//2G
	states[Connection.CELL_3G] = 'Cell 3Gconnection';//3G
	states[Connection.CELL_4G] = 'Cell 4Gconnection';//4G
	states[Connection.CELL] = 'Cell generic connection';//蜂窝网络
	states[Connection.NONE] = 'No network connection';

	if (networkState == Connection.NONE) {
		showAlert('请连接网络', '没有网络连接');
	}
	alert('Connection type: ' + states[networkState]);
}
//checkConnection();


//f关闭所有弹出窗口
function showDialog(dn){
	var html = template.render('templ_dialog_'+dn);
	
	$('#myDialog').html(html).trigger("create");
	$("#mydialogBtn").click();
	//$('#myDialog').dialog('open');
}
function closeDialog(){
	if($('#myDialog'))
	   $('#myDialog').dialog('close');
}
function closeConfirm(){
	if($('#confirmDialog'))
	   $('#confirmDialog').popup('close');
}
// 显示定制警告框
function showAlert(msg,tm) {

	$.mobile.loading('show', {
				text : msg, //加载器中显示的文字
				textVisible : true, //是否显示文字
				theme : 'b', //加载器主题样式a-e
				textonly : true, //是否只显示文字
				html : ""//要显示的html内容，如图片等
			});
	if(!tm)
		setTimeout(hideLoading, 2000);
	else
		setTimeout(hideLoading, tm);
}

//模拟confirm
function confirmCancleFun(){
	 $('#confirmDialog').popup('close');
}
var confirm = function(title,message,cancleFun,sureFun) {
		$("#confirmDialog_title").html(title);
		$("#confirmDialog_message").html(message);
		if(!cancleFun){
			cancleFun = confirmCancleFun;
		}
		$("#confirmCancleBtn").fastClick(function(){
				cancleFun();
		});
	   	
		$("#confirmSureBtn").fastClick(function(){
			sureFun();
		});
		
		$("#exitConfirmBtn").click();
};

 

//msg：提示内容，time:吐司延迟消失时间第(可以不写，不写默认1500毫秒延迟)
function Toast(msg, duration) {
	showAlert(msg);
}

//取到网络参数
var Request = new Array();
function loadQueryString(url) {

	var s = url.replace("#", "&");
	var n = s.indexOf("?");
	if (n >= 0)
		s = s.substring(n + 1);
	var valuelist = s.split("&");
	for (var i = 0; i < valuelist.length; i++) {
		var pair = valuelist[i].split("=");
		if (pair.length > 1) {
			Request[pair[0].toLowerCase()] = pair[1];
		}
	}
}

if (window.location.href.indexOf("?") > 0) {
	loadQueryString(window.location.href);
	notify = window.location.href;
	//alert(notify);
}

//页面刷新
function pageRefresh(){
	$.mobile.pageContainer.trigger("create");
}

//=================一些JS数据方法=============================
//改变hash
function changeHash(hashPage) {

	window.location.hash = hashPage;
}
//数字约分
function roundNumber(num) {
	var dec = 3;
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

// replaceAll 方法实现
function replaceAll(Astr, AFindText, ARepText) {
	var raRegExp = new RegExp(AFindText, "g");

	return Astr.replace(raRegExp, ARepText);
}

// 通过url加载html内容
var urlLoadContent = function(url) {
	var content = "";
	$.ajax({
				url : url,
				type : 'GET',
				dataType : "html",
				async : false,
				success : function(html, textStatus, xhr) {
					content = html;
				},
				error : function(xhr, textStatus, errorThrown) {
					content = "";
				}
			});
	return content;
};

//json数据转换
function toObject(value) {
	return $.parseJSON(value);
}

function toJson(value) {
	return JSON.parse(value);
}

function toString(value) {
	return JSON.stringify(value);
}

//在浏览器上显示组装路径
function showUrl(url) {
	document.write(url);
}


function date2str(_x, y) {
	var x = getDate(_x);
	var z = {
		M : x.getMonth() + 1,
		d : x.getDate(),
		h : x.getHours(),
		m : x.getMinutes(),
		s : x.getSeconds()
	};
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
				return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
						.slice(-2)
			});
	return y.replace(/(y+)/g, function(v) {
				return x.getFullYear().toString().slice(-v.length)
			});
}

// =========================PhoneGap==================================

function exitApp() {
	isExit();
}

function closeApp() {
	navigator.app.exitApp();
}

// 菜单键
function eventMenuButton() {
	showAlert('点击了菜单按钮!');
	//goTo('menu.html');
}
// 搜索键
function eventSearchButton() {
	showAlert('点击了搜索按钮!');
}

/**
 * 检查网络情况
 * @returns {Boolean}
 */
function checkConnection() {
	var networkState = navigator.network.connection.type;
	if (networkState == Connection.NONE) {
		showAlert("请确认网络连接已开启,并重试...",5000);
		//navigator.notification.confirm('请确认网络连接已开启,并重试...', function(btn){return false;}, '提示', '确定');
		return false;
	} else {
		return true;
	}
}
 
function isExit() {
	//goTo("global/exitApp.html");
	//navigator.notification.confirm('确认退出?',showExitConfirm, '退出软件', '确定,取消');
	confirm('确认退出?','真的不再多待一会儿啦?',null,closeApp);
}
function showExitConfirm(btn) {
	if (btn == 1) {
		navigator.app.exitApp();
	}
}


// 等待加载PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap加载完毕
function onDeviceReady() {
	// 按钮事件
	document.addEventListener("backbutton", eventBackButton, false); // 返回键
	document.addEventListener("menubutton", eventMenuButton, false); // 菜单键
	document.addEventListener("searchbutton", eventSearchButton, false); // 搜索键
	checkConnection();
}

// 返回键
function eventBackButton() {
	if ($.mobile.activePage.is('#indexPage')
			|| $.mobile.activePage.is('#loginPage')) {
		showAlert('再按一次返回键退出软件!');
		document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
		document.addEventListener("backbutton", closeApp, false);// 绑定退出事件
		// 3秒后重新注册
		var intervalID = window.setInterval(function() {
					window.clearInterval(intervalID);
					document.removeEventListener("backbutton", closeApp, false); // 注销返回键
					document.addEventListener("backbutton", eventBackButton,
							false); // 返回键
				}, 3000);
	} else {
		//navigator.app.backHistory();
		//$.mobile.back();
	}
}
