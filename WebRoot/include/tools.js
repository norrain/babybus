var isAndroid = (/android/gi).test(navigator.appVersion);
var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
var isWebOS = (/webOS/gi).test(navigator.appVersion);

var IsDeviceReady = false;

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

//全局配置
var global = {
	WEBSITE : "http://xxx.com/"
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

// 显示定制警告框
function showAlert(msg) {

	$.mobile.loading('show', {
				text : msg, //加载器中显示的文字
				textVisible : true, //是否显示文字
				theme : 'b', //加载器主题样式a-e
				textonly : true, //是否只显示文字
				html : ""//要显示的html内容，如图片等
			});
	setTimeout(hideLoading, 2000);
}

//模拟confirm
var confirm = function(content, title, response) {
	var html = "<div data-role='popup' id='mToast_confirm' data-theme='d' data-overlay-theme='b' style='max-width:340px;overflow:hidden;'><div class='ui-header ui-bar-a ui-corner-top'><h1 class='ui-title'>"
			+ title
			+ "</h1></div><div class='ui-content'><p></p>"
			+ content
			+ "<p></p><a data-role='button' data-inline='true' data-rel='back' data-mini='true'>取消</a><a id='mToast_confirm_response' data-role='button' data-theme='b' data-icon='check' data-inline='true' data-mini='true'>确定</a></div></div>", previous = $(".ui-popup-active div[data-role=popup]"), divConfirm = $("div#mToast_confirm");
	previous.popup('close');

	if (divConfirm.length > 0) {
		divConfirm.remove();
	}
	divConfirm = $(html).appendTo("div[data-role=page]:first");
	divConfirm.trigger('create') // <-- 生成popup
			.trigger('refresh').popup().find("#mToast_confirm_response").on(
					'fastClick', function() {
						divConfirm.popup('close');
						previous.popup('open');
						response();
					});
	divConfirm.popup('open'); // -->
};

// 处理确认退出对话框返回的结果
function onConfirmExit(button) {
	if (button) {
		navigator.app.exitApp();
		localStorage.removeItem("loginUser");
	}
}

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
		navigator.notification.confirm('请确认网络连接已开启,并重试...', function(btn){
			return false;
		}, '提示', '确定');
		return false;
	} else {
		return true;
	}
}
 
function isExit() {
	navigator.notification.confirm('确认退出?',showExitConfirm, '退出软件', '确定,取消');
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
		showAlert('再按一次退出!');
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
